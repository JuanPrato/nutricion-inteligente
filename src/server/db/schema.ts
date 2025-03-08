import { relations, sql } from "drizzle-orm";
import {
  index,
  int, integer,
  primaryKey,
  sqliteTableCreator,
  text
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `nutricion-inteligente_${name}`);

export const users = createTable("user", {
  id: text("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("email_verified", {
    mode: "timestamp",
  }).default(sql`(unixepoch())`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  plates: many(plates),
  foods: many(foods)
}));

export const accounts = createTable(
  "account",
  {
    userId: text("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("provider_account_id", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("session_token", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const ingredients = createTable("ingredients", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  kcal: integer("kcal").default(0),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
  ingredientsToPlates: many(ingredientsToPlates)
}))

export const plates = createTable("plates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  userId: text("user_id", { length: 255 }).notNull(),
});

export const platesRelations = relations(plates, ({ many, one }) => ({
  ingredientsToPlates: many(ingredientsToPlates),
  user: one(users, {
    fields: [plates.userId],
    references: [users.id],
  }),
  foods: many(foods)
}))


export const ingredientsToPlates = createTable(
    "ingredients_to_plates",
    {
      ingredientId: integer("ingredient_id").notNull().references(() => ingredients.id),
      plateId: integer("plate_id").notNull().references(() => plates.id)
    },
    (table) => ({
      compoundKey: primaryKey({ columns: [table.ingredientId, table.plateId] })
    })
);

export const ingredientsToPlatesRelations = relations(ingredientsToPlates, ({ one }) => ({
  group: one(ingredients, {
    fields: [ingredientsToPlates.ingredientId],
    references: [ingredients.id],
  }),
  user: one(plates, {
    fields: [ingredientsToPlates.plateId],
    references: [plates.id],
  }),
}));

export const foods = createTable("foods", {
  id: integer("id"),
  category: text("category", { enum: ["BREAKFAST", "LAUNCH", "AFTER_LAUNCH", "DINNER"] }),
  snack: integer("snack", { mode: "boolean" }),
  day: integer("day", { mode: "timestamp" }),
  plateId: integer("plate_id").references(() => plates.id),
  userId: text("user_id", { length: 255 }).notNull(),
});

export const foodsRelations = relations(foods, ({ one }) => ({
  plate: one(plates, {
    fields: [foods.plateId],
    references: [plates.id],
  }),
  user: one(users, {
    fields: [foods.userId],
    references: [users.id],
  })
}));