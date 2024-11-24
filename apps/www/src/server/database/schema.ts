import { relations } from "drizzle-orm";
import { bigint, pgEnum, pgTable as table, text, timestamp, unique } from "drizzle-orm/pg-core";
import { genSnowflake } from "~/utils/snowflake";

export const users = table("users", {
  id: bigint({ mode: "bigint" }).primaryKey(),
  nickname: text(),
  updatedAt: timestamp({ mode: "date", precision: 0 }).$onUpdateFn(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export type User = typeof users.$inferSelect;

export const Providers = ["discord", "battle.net"] as const;

export type Provider = (typeof Providers)[number];

export const providerEnum = pgEnum("provider", Providers);

export const accounts = table(
  "accounts",
  {
    id: bigint({ mode: "bigint" }).primaryKey(),
    userId: bigint({ mode: "bigint" })
      .references(() => users.id)
      .notNull(),
    providerType: providerEnum().notNull(),
    providerId: text().notNull(),
    refreshToken: text(),
    accessToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "date" }),
    updatedAt: timestamp({ mode: "date", precision: 0 }).$onUpdateFn(() => new Date()),
  },
  (table) => ({
    uniqueAccounts: unique().on(table.providerId, table.providerType),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = table("sessions", {
  id: text().primaryKey(),
  userId: bigint({ mode: "bigint" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp({ mode: "date" }),
});

export const posts = table("posts", {
  id: bigint({ mode: "bigint" }).primaryKey().$defaultFn(() => genSnowflake()),
  title: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  content: text(),
  authorId: bigint({ mode: "bigint" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  updatedAt: timestamp({ mode: "date", precision: 0 }).$onUpdateFn(() => new Date()),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
