import type { ingredients } from "~/server/db/schema";

export type Ingredient = typeof ingredients.$inferSelect;