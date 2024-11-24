import * as v from "valibot";

type ExclusiveKeys<T, U> = {
  [K in keyof T]: K extends keyof U ? never : T[K];
};

const example = v.object({
  foo: v.string(),
});

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type InferSchema<T> = T extends Record<string, v.GenericSchema>
  ? v.InferOutput<v.ObjectSchema<T, undefined>>
  : Record<string, unknown>;

/**
 * A rudimentary env proxy that validates environment variables similar to [`t3-env`](https://github.com/t3-oss/t3-env/) but with [`valibot`](https://github.com/fabian-hiller/valibot).
 */
export function defineEnv<
  TClient extends Record<string, v.GenericSchema> | undefined = undefined,
  TServer extends Record<string, v.GenericSchema> | undefined = undefined,
>(options: {
  client?: TClient;
  server?: TClient extends Record<string, v.GenericSchema>
    ? ExclusiveKeys<TServer, TClient>
    : TServer;
  env?: Record<keyof TClient | keyof TServer, unknown>;
}): Prettify<InferSchema<TClient> & InferSchema<TServer>> {
  const isServer = typeof window === "undefined";

  const schema = v.object({
    ...options.client,
    ...(isServer ? options.server : {}),
  });

  const result = v.safeParse(schema, options.env);

  if (!result.success) {
    const issues = result.issues.reduce(
      (issues, issue) => {
        const path = issue.path?.map((p) => p.key).join(".") || "root";

        if (!issues[path]) {
          issues[path] = [issue.message];
        } else {
          issues[path].push(issue.message);
        }

        return issues;
      },
      {} as Record<string, string[]>,
    );

    throw new Error(`❌ Invalid environment variables\n${JSON.stringify(issues, null, 2)}`, {
      cause: result.issues,
    });
  }

  // Disallow server-only env access on the client.
  const isPropertyAllowed = (property: string) => {
    return isServer ? true : options.server && !(property in options.server);
  };

  return new Proxy(result.output, {
    get(target, property) {
      if (typeof property !== "string") return undefined;
      if (!isPropertyAllowed(property)) {
        throw new Error("❌ Attempted access of server-only environment variable on the client.");
      }

      return Reflect.get(target, property);
    },
  }) as any;
}
