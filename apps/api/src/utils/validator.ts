import type { Env, Input, MiddlewareHandler, ValidationTargets } from "hono";
import { validator } from "hono/validator";
import { type GenericSchema, type InferInput, type InferOutput, safeParseAsync } from "valibot";

type HasUndefined<T> = undefined extends T ? true : false;

const valibotValidator = <
  Target extends keyof ValidationTargets,
  Schema extends GenericSchema,
  E extends Env,
  P extends string,
  In = InferInput<Schema>,
  Out = InferOutput<Schema>,
  I extends Input = {
    in: HasUndefined<In> extends true
    ? {
      [K in Target]?: In extends ValidationTargets[K]
      ? In
      : { [K2 in keyof In]?: ValidationTargets[K][K2] }
    }
    : {
      [K in Target]: In extends ValidationTargets[K]
      ? In
      : { [K2 in keyof In]: ValidationTargets[K][K2] }
    }
    out: { [K in Target]: Out }
  },
  V extends I = I
>(target: Target, schema: Schema): MiddlewareHandler<E, P, V> =>
  // @ts-expect-error not typed well
  validator(target, async (value, c) => {
    const result = await safeParseAsync(schema, value);

    if (result.success) {
      return result.output;
    }

    return c.json(result, 400);
  });

export {
  valibotValidator as validator
};
