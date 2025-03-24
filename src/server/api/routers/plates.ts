import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
});