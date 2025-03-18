export namespace Discord {
  /**
   * Discord [Snowflake](https://discord.com/developers/docs/reference#snowflakes).
   */
  export type Snowflake = string;

  export type User = {
    id: Snowflake;
    username: string;
    discriminator: string;
    global_name?: string;
    avatar?: string;
    banner?: string;
  };
}
