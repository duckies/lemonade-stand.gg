import { type Credentials, OAuth2Client, request } from "@repo/common";
import chalk from "chalk";
import { z } from "zod";

export const getGuildReportSchema = z.object({
  guild: z.union([z.object({ name: z.string(), realm: z.string(), region: z.string() }), z.object({ id: z.string() })]),
});

export class WarcraftLogs {
  public readonly auth: OAuth2Client;
  public credentials?: Promise<Credentials>;

  constructor(options: { clientId: string; clientSecret: string }) {
    this.auth = new OAuth2Client({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      tokenEndpoint: "https://www.warcraftlogs.com/oauth/token",
      authorizationEndpoint: "https://www.warcraftlogs.com/oauth/authorize",
    });
  }

  public log(...args: unknown[]) {
    const purple = chalk.hex("992dfb");
    console.log(purple.bold("[WarcraftLogs]"), ...args);
  }

  /**
   * Obtains and caches a singleton instance of the client credentials.
   *
   * This method will regenerate the credentials if they expire.
   */
  private async getCredentials() {
    return process.env.WARCRAFTLOGS_API_KEY as string;
    // // Generate client credentials if they don't exist.
    // if (!this.credentials) {
    //   this.log("Generating new credentials");
    //   this.credentials = this.auth.getClientCredentials();

    //   return this.credentials;
    // }

    // const credentials = await this.credentials;

    // // The existing credentials have expired, get new ones.
    // if (credentials.isExpired) {
    //   this.credentials = this.auth.getClientCredentials();

    //   return this.credentials;
    // }

    // return credentials;
  }

  public async query<T = unknown>(query: string) {
    const credentials = await this.getCredentials();

    // this.log("Obtained credentials", credentials);

    return fetch("https://www.warcraftlogs.com/api/v2/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials}`,
      },
      body: JSON.stringify({ query }),
    });
  }

  public getGuildReports(guild: z.infer<typeof getGuildReportSchema>["guild"]) {
    const params =
      "name" in guild
        ? {
            guildName: guild.name,
            guildServerSlug: guild.realm,
            guildServerRegion: guild.region,
          }
        : { guildID: guild.id };

    return request("https://www.warcraftlogs.com/api/v2/client", {
      method: "POST",
      body: JSON.stringify({
        query: `{
          reportData {
            reports(${JSON.stringify(params)}) {
              data {
                code,
                title,
                zone {
                  id,
                  name
                }
              }
            }
          }
        }`,
      }),
    });
  }
}
