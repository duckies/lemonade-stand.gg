import { relations } from "drizzle-orm";
import { customType, pgEnum, pgTable as table, text, timestamp, unique } from "drizzle-orm/pg-core";
import { genSnowflake } from "../lib/snowflake";

const bigintString = customType<{ data: string; driverData: bigint }>({
  dataType() {
    return "bigint";
  },
  fromDriver(value: bigint): string {
    return value.toString();
  },
});

export const users = table("users", {
  // id: bigintString.primaryKey(),
  id: bigintString().primaryKey(),
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
    id: bigintString()
      .primaryKey()
      .$defaultFn(() => genSnowflake()),
    userId: bigintString()
      .references(() => users.id)
      .notNull(),
    providerType: providerEnum().notNull(),
    providerId: text().notNull(),
    refreshToken: text(),
    accessToken: text(),
    accessTokenExpiresAt: timestamp({ mode: "date" }),
    updatedAt: timestamp({ mode: "date", precision: 0 }).$onUpdateFn(() => new Date()),
  },
  (t) => [unique().on(t.providerId, t.providerType)],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessions = table("sessions", {
  id: text().primaryKey(),
  userId: bigintString()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  expiresAt: timestamp({ mode: "date" }),
});

export const posts = table("posts", {
  id: bigintString()
    .primaryKey()
    .$defaultFn(() => genSnowflake()),
  title: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  content: text(),
  authorId: bigintString()
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
