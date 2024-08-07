import { Frequency, RRule } from "rrule";
import { z } from "zod";
import { isPOJO } from "~/lib/utils";

const createRRuleSchema = z.preprocess(
  (data) => {
    if (!isPOJO(data)) return false;

    const retval: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== "") {
        retval[key] = value;
      }
    }
    return retval;
  },
  z.object({
    frequency: z.preprocess((x) => Number(x), z.nativeEnum(Frequency).optional()),
    dtstart: z.coerce.date().optional(),
    count: z.coerce.number().min(1).optional(),
    byweekday: z.array(z.coerce.number().min(0).max(6)).optional(),
  }),
);

type CreateRRuleDTO = z.infer<typeof createRRuleSchema>;

export function createRRule(dto: CreateRRuleDTO) {
  const options = createRRuleSchema.parse(dto);

  const rrule = new RRule({
    dtstart: options.dtstart,
    freq: options.frequency,
    count: options.count,
    byweekday: options.byweekday,
  });

  // const set = new RRuleSet({
  // dtstart:
  // })

  return rrule;
}
