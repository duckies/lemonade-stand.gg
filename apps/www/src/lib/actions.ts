import { unstable_rethrow } from "next/navigation";
import * as v from "valibot";

export type Awaitable<T> = T | PromiseLike<T>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type ActionErrorResponse<Schema extends v.GenericSchema> = {
  error: {
    code: string;
    message?: string;
    data?: any;
    issues?: v.FlatErrors<Schema>;
  };
};

export type ActionOptions<Schema extends v.GenericSchema, T, IsForm extends boolean = false> = {
  schema: Schema;
  form?: IsForm;
  action: (data: v.InferInput<Schema>) => Awaitable<T>;
};

export type ActionResponse<Schema extends v.GenericSchema, T> = ActionErrorResponse<Schema> | {
  data: T;
};

export type ServerAction<Schema extends v.GenericSchema, T> = (data: v.InferInput<Schema>) => Promise<T> | ((data: FormData) => void | Promise<void>);

/**
 * Middleware utility for server actions with validated FormData.
 */
export function defineAction<Schema extends v.GenericSchema, ReturnVal, IsForm extends boolean = false>({
  schema,
  form,
  action,
}: ActionOptions<Schema, ReturnVal, IsForm>) {
  return async (data: IsForm extends true ? FormData : v.InferInput<Schema>): Promise<ActionResponse<Schema, ReturnVal>> => {
    try {
      const params = data instanceof FormData ? Object.fromEntries(data) : data;
      const input = v.parse(schema, params);

      const result = await action(input);

      return { data: result };
    } catch (error) {
      // Rethrow any internal Next.js errors.
      unstable_rethrow(error);

      if (error instanceof v.ValiError) {
        return { error: { code: "BAD_REQUEST", issues: v.flatten<Schema>(error.issues) } };
      }

      // TODO: More robust.
      if (error && typeof error === "object" && Object.getPrototypeOf(error) === Object.prototype && "code" in error && typeof error.code === "string") {
        return { error: { code: error.code, message: "message" in error && typeof error.message === "string" ? error.message : undefined } };
      }

      return { error: { code: "UNKNOWN_ERROR" } };
    }
  };
}
