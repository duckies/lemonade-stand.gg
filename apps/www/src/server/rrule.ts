import { RRule } from "rrule";
import { db } from "./database/database";
import { events, type InsertEvent } from "./database/schema";
import { type CreateEventDTO, createEventSchema } from "./dto/create-event.dto";

export async function createEvent(dto: CreateEventDTO) {
  const options = createEventSchema.parse(dto);

  const event: InsertEvent = {
    start: options.start.toISOString(),
    end: options.end?.toISOString(),
    title: options.title,
    description: options.description,
  };

  if (options.recurrence) {
    const rrule = new RRule({
      dtstart: options.start,
      freq: options.recurrence.freq,
      count: options.recurrence.count,
      byweekday: options.recurrence.byweekday,
    });

    event.recurrence = rrule.toString();
  }

  const result = await db.insert(events).values(event).returning();

  return result;
}
