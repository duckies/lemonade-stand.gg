import type { InferSelectModel } from "drizzle-orm";
import { boolean, date, pgTable, serial, smallint, text } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  title: text("name").notNull(),
  description: text("description"),
  start: date("start").notNull(),
  end: date("end"),
  duration: smallint("duration").notNull(),
  isAllDay: boolean("all_day").notNull(),
});

export const eventRecurrences = pgTable("event_recurrences", {
  id: serial("id").primaryKey(),
  rrule: text("rrule").notNull(),
  start: date("start").notNull(),
  end: date("end"),
});

export type Event = InferSelectModel<typeof events>;

export const eventExceptions = pgTable("event_exceptions", {});
