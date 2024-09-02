import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { date, foreignKey, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const events = pgTable(
  "events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("name").notNull(),
    description: text("description"),
    start: date("start").notNull(),
    end: date("end"),
    originalStart: date("originalStart"),
    recurrence: text("recurrence"),
    parentId: uuid("parent_id"),
  },
  (table) => {
    return {
      parentReference: foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
      }),
    };
  },
);

export type Event = InferSelectModel<typeof events>;
export type InsertEvent = InferInsertModel<typeof events>;

export const posts = pgTable("posts", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  document: text("document").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => "now()"),
});

export type Post = InferSelectModel<typeof posts>;
export type InsertPost = InferInsertModel<typeof posts>;
