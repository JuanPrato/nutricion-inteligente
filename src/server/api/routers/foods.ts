import type { Food } from "~/lib/types";

import { eq } from "drizzle-orm";
import { z } from "zod";
import { FOODS } from "~utils/const";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { foods } from "~/server/db/schema";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

type ResponseGetTodayFoods = {
  BREAKFAST: Food[],
  LAUNCH: Food[],
  AFTER_LAUNCH: Food[],
  DINNER: Food[]
}

const getCaloriesSchema = z.object({
  days: z.array(z.date())
}).optional();

const saveFoodSchema = z.object({
  foodId: z.number().optional(),
  plateId: z.number(),
  category: z.nativeEnum(FOODS).optional(),
  snack: z.boolean().optional(),
});

export const foodsRouter = createTRPCRouter({
  getTodayFoods: protectedProcedure.query(async ({ ctx }) => {
    const today = dayjs();

    const foods = await ctx.db.query.foods.findMany({
      where: (food, { sql, and, eq }) =>
        and(
            sql`DATE(${food.day}, 'unixepoch') = DATE(${today.format("YYYY-MM-DD")})`,
            eq(food.userId, ctx.session.user.id)
        ),
      with: {
        category: true,
        plate: true
      }
    });

    return generateResponse(foods);
  }),
  getCalories: protectedProcedure.input(getCaloriesSchema).query(async ({ ctx, input }) => {

    const datesToFilter = input ? input.days.map((d) => dayjs(d)) : [dayjs()];

    const filterString = datesToFilter
      .map((d) => `DATE('${d.format("YYYY-MM-DD")}')`)
      .join(",");

    const foods = await ctx.db.query.foods.findMany({
      where: (food, { sql, and, eq }) =>
          and(
              sql`DATE(${food.day}, 'unixepoch') IN (${sql.raw(filterString)})`,
              eq(food.userId, ctx.session.user.id)
          ),
      with: {
        plate: {
          with: {
            ingredientsToPlates: {
              with: {
                ingredient: true
              }
            }
          }
        }
      },
    });

    const response = datesToFilter.reduce<Record<string, number>>((acc, date) => {
      acc[dayjs(date).format("YYYY-MM-DD")] = 0;
      return acc;
    }, {});
    
    for (const food of foods) {
      const key = dayjs(food.day).format("YYYY-MM-DD");
      response[key] = response[key]! + food.plate!.ingredientsToPlates
          .reduce<number>((acc, ing) => acc + (ing.ingredient.kcal ?? 0), 0)
    }
    
    return response;
  }),
  saveFood: protectedProcedure
    .input(saveFoodSchema)
    .mutation(async ({ ctx, input }) => {

      if (input.foodId) {
        const food = await ctx.db.query.foods
            .findFirst({
              where: (food, { and, eq }) =>
                  (and(eq(food.id, input.foodId!), eq(food.userId, ctx.session.user.id)))
            });

        if (!food) {
          throw new Error("No such food");
        }

        await ctx.db.update(foods)
            .set({ plateId: input.plateId })
            .where(eq(foods.id, food.id));

        return true;
      }

      if (!input.category) {
        throw new Error("No such category");
      }

      const category = await ctx.db.query.categories
          .findFirst({
            where: (category, { eq }) =>
                eq(category.description, input.category!.toUpperCase())
          });

      if (!category) {
        throw new Error("No such category");
      }

      await ctx.db.insert(foods).values({
        categoryId: category.id,
        snack: !!input.snack,
        day: dayjs().startOf("day").utc(false).toDate(),
        plateId: input.plateId,
        userId: ctx.session.user.id
      });

      return true;
    })
});

function generateResponse(foods: Food[]): ResponseGetTodayFoods {

  return foods.reduce<ResponseGetTodayFoods>(
    (acc, food) => {

      acc[food.category!.description as keyof typeof acc].push(food);

      return acc;
    },
    {
      BREAKFAST: [],
      LAUNCH: [],
      AFTER_LAUNCH: [],
      DINNER: []
    }
  );
}