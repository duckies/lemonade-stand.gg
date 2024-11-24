import { Snowflake } from "nodejs-snowflake";

/**
 * @see https://www.npmjs.com/package/nodejs-snowflake
 */
export const snowflake = new Snowflake({
  custom_epoch: new Date("2024-01-01T00:00:00Z").getTime(),
  instance_id: 1,
});

/**
 * Creates a new Snowflake and returns its primitive.
 */
export function genSnowflake() {
  return snowflake.getUniqueID().toString();
}
