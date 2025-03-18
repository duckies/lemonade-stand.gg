import { type InferSelectModel, sql } from "drizzle-orm";
import {
  json,
  pgEnum,
  pgTable as table,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const commonColumns = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};

export const users = table("users", {
  id: uuid().default(sql`uuid_generate_v7()`).primaryKey(),
  name: text().notNull(),
  avatar: text().notNull(),
  ...commonColumns,
});

export const Providers = ["discord", "battle.net"] as const;

export type Provider = (typeof Providers)[number];

export const providersEnum = pgEnum("provider_id_enum", Providers);

export const accounts = table(
  "accounts",
  {
    id: uuid().default(sql`uuid_generate_v7()`).primaryKey(),
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    providerId: providersEnum().notNull(),
    providerUserId: text().notNull(),
    accessToken: text(),
    refreshToken: text(),
    accessTokenExpiresAt: timestamp(),
    refreshTokenExpiresAt: timestamp(),
    scope: text(),
    profile: json().notNull(),
    ...commonColumns,
  },
  (t) => [uniqueIndex().on(t.providerId, t.providerUserId)],
);

export const sessions = table("sessions", {
  id: text().primaryKey(),
  userId: uuid()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp().notNull(),
});

export type User = InferSelectModel<typeof users>;
export type Account = InferSelectModel<typeof accounts>;
export type Session = InferSelectModel<typeof sessions>;
