declare module "bun" {
  interface Env {
    AUTH_SECRET: string;
    DATABASE_URL: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_SECRET_KEY: string;
    DISCORD_REDIRECT_URI: string;
  }
}
