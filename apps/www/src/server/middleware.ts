import * as v from "valibot";

export type ActionState = {
  error?: string;
  [key: string]: any;
};

export type ValidatedActionFn<S extends v.GenericSchema, T extends ActionState> = (
  schema: v.InferInput<S>,
) => Promise<T> | T;

export function createAuthAction<S extends v.GenericSchema, T extends ActionState>(
  schema: S,
  action: ValidatedActionFn<S, T>,
) {
  return async (_prevState: ActionState, formData: FormData): Promise<ActionState> => {
    const result = v.safeParse(schema, Object.fromEntries(formData));

    if (!result.success) {
      return { error: "Bad Request", issues: v.flatten(result.issues) };
    }

    return action(result.output);
  };
}
