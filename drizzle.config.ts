import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: env.NODE_ENV === "production" ? "sqlite" : "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DB_AUTH_TOKEN
  },
  tablesFilter: ["nutricion-inteligente_*"],
} satisfies Config;
