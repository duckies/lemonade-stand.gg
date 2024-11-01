import { unstable_rethrow } from "next/navigation";
import * as v from "valibot";
import type { MaybePromise } from "~/types";
import { ActionError, ActionInputError } from "../errors/action";

export type ActionType = "form" | "json";

export type ActionHandler<TInputSchema, TOutput> = TInputSchema extends v.GenericSchema
  ? (input: v.InferInput<TInputSchema>) => v.MaybePromise<TOutput>
  : (input: any) => v.MaybePromise<TOutput>;

export type ActionClient<
  TOutput,
  TType extends ActionType | undefined,
  TInputSchema extends v.GenericSchema | undefined,
> = TInputSchema extends v.GenericSchema
  ? (
      input: TType extends "form" ? FormData : v.InferInput<TInputSchema>,
    ) => Promise<SafeResult<TInputSchema, Awaited<TOutput>>>
  : (input?: any) => Promise<SafeResult<never, Awaited<TOutput>>>;

export function defineAction<
  TOutput,
  TType extends ActionType | undefined,
  TInputSchema extends v.GenericSchema | undefined,
>({
  type,
  input: inputSchema,
  handler,
}: {
  input?: TInputSchema;
  type?: TType;
  handler: ActionHandler<TInputSchema, TOutput>;
}): ActionClient<TOutput, TType, TInputSchema> & string {
  const serverHandler =
    type === "form"
      ? getFormServerHandler(handler, inputSchema)
      : getJSONServerHandler(handler, inputSchema);

  async function action(input: unknown) {
    return callSafely(() => serverHandler(input));
  }

  return action as ActionClient<TOutput, TType, TInputSchema> & string;
}

function getFormServerHandler<TOutput, TInputSchema extends v.GenericSchema>(
  handler: ActionHandler<TInputSchema, TOutput>,
  inputSchema?: TInputSchema,
) {
  return async (input: unknown): Promise<Awaited<TOutput>> => {
    if (!(input instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData.",
      });
    }

    if (!inputSchema) return await handler(input);

    const parsed = await v.safeParseAsync(inputSchema, Object.fromEntries(input.entries()));

    if (!parsed.success) {
      throw new ActionInputError(parsed.issues);
    }

    return await handler(parsed.output);
  };
}

function getJSONServerHandler<TOutput, TInputSchema extends v.GenericSchema>(
  handler: ActionHandler<TInputSchema, TOutput>,
  inputSchema?: TInputSchema,
) {
  return async (input: unknown): Promise<Awaited<TOutput>> => {
    if (input instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON.",
      });
    }

    if (!inputSchema) return await handler(input);

    const parsed = await v.safeParseAsync(inputSchema, input);

    if (!parsed.success) {
      throw new ActionInputError(parsed.issues);
    }

    return await handler(parsed.output);
  };
}

export type SafeResult<TInput extends v.GenericSchema, TOutput> =
  | {
      data: TOutput;
      error: undefined;
    }
  | {
      data: undefined;
      error: ActionError<TInput>;
    };

export async function callSafely<TOutput>(
  handler: () => MaybePromise<TOutput>,
): Promise<SafeResult<v.GenericSchema, TOutput>> {
  try {
    const data = await handler();
    return { data, error: undefined };
  } catch (e) {
    // Rethrow internal Next.js errors.
    unstable_rethrow(e);

    console.error("Server Action Error", e);

    if (e instanceof ActionError) {
      return { data: undefined, error: e };
    }

    return {
      data: undefined,
      error: new ActionError({
        code: "INTERNAL_SERVER_ERROR",
        message: e instanceof Error ? e.message : "Unknown error.",
      }),
    };
  }
}
