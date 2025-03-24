import type { ingredients } from "~/server/db/schema";
import type { BuildQueryResult, DBQueryConfig, ExtractTablesWithRelations } from 'drizzle-orm';
import type * as schema from "~/server/db/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
    'one' | 'many',
    boolean,
    TSchema,
    TSchema[TableName]
>['with'];

export type InferResultType<
    TableName extends keyof TSchema,
    With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
    TSchema,
    TSchema[TableName],
    {
      with: With;
    }
>;

export type Ingredient = typeof ingredients.$inferSelect;

export type Plate = InferResultType<"plates", { ingredientsToPlates: { with: { ingredient: true } }, platesToCategories: { with: { category: true } } }>;