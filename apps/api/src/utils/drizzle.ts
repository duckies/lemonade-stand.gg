import { HTTPException } from "hono/http-exception";

export function getFirstOrThrow<R>(rows: R[]): R {
  const row = rows[0];

  if (!row) {
    throw new HTTPException(404);
  }

  return row;
}
