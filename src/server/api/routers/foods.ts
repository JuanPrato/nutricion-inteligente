import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import dayjs from "dayjs";
import type { Food } from "~/lib/types";
import { z } from "zod";
import { FOODS } from "~utils/const";
import { foods } from "~/server/db/schema";
import { eq } from "drizzle-orm";

type ResponseGetTodayFoods = {
  BREAKFAST: Food[],
  LAUNCH: Food[],
  AFTER_LAUNCH: Food[],
  DINNER: Food[]
}

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
      where: (food, { sql }) =>
        sql`DATE(${food.day}, 'unixepoch') = DATE(${today.format("YYYY-MM-DD")})`,
      with: {
        category: true,
        plate: true
      }
    });

    return generateResponse(foods);
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
        day: new Date(),
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