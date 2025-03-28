import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { ingredientsToPlates, plates, platesToCategories } from "~/server/db/schema";

const SavePlateSchema = z.object({
  name: z.string(),
  types: z
    .array(z.string())
    .min(1, { message: "Se debe seleccionar una categoría" }),
  ingredients: z
    .array(z.number())
    .min(1, { message: "Se debe ingresar un ingrediente" }),
})

export const platesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.plates.findMany({
      where: (plates, { eq }) => eq(plates.userId, ctx.session.user.id),
      with: {
        ingredientsToPlates: {
          with: {
            ingredient: true
          }
        },
        platesToCategories: {
          with: {
            category: true
          }
        }
      }
    });
  }),
  savePlate: protectedProcedure.input(SavePlateSchema).mutation(async ({ ctx, input }) => {

    await ctx.db.transaction(async (tx) => {
      const [plate] = await tx.insert(plates).values({
        name: input.name,
        userId: ctx.session.user.id,
      }).returning({ id: plates.id });

      if (!plate) {
        tx.rollback();
        return;
      }

      const categories = await tx.query.categories.findMany({
        where: (category, { inArray }) => inArray(category.description, input.types)
      });

      await tx
          .insert(platesToCategories)
          .values(
              categories.map((c) => ({
                plateId: plate.id,
                categoryId: c.id
              })
            ));

      await tx.insert(ingredientsToPlates).values(
          input.ingredients.map((ingredient) => ({
            plateId: plate.id,
            ingredientId: ingredient
          }))
      )
    });

    return true;
  })
});