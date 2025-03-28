import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { ingredientsRouter } from "~/server/api/routers/ingredients";
import { platesRouter } from "~/server/api/routers/plates";
import { foodsRouter } from "~/server/api/routers/foods";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ingredients: ingredientsRouter,
  plates: platesRouter,
  foods: foodsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
