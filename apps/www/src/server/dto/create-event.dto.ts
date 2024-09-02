import { z } from "zod";

/**
 * This could also be represented as a union of non-recurring
 * and recurring schemas, however, it makes mapping errors to
 * the form much more difficult.
 */
export const createEventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  start: z.date(),
  end: z.coerce.date().optional(),
  recurrence: z
    .object({
      freq: z.coerce.number().min(0).max(3),
      until: z.coerce.date().optional(),
      count: z.coerce.number().min(1).optional(),
      byweekday: z.array(z.enum(["MO", "TU", "WE", "TH", "FR", "SA", "SU"])).optional(),
    })
    .optional(),
});

export type CreateEventDTO = z.infer<typeof createEventSchema>;
