import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ingredientsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.ingredients.findMany({
      orderBy: (ingredients, { asc }) => asc(ingredients.name),
    });
  }),
});