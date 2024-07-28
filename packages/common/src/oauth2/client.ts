import { Credentials } from "./credentials";

export interface OAuth2Options {
  clientId: string;
  clientSecret: string;
  tokenEndpoint: string;
  authorizationEndpoint: string;
}

export interface TokenResponseBody {
  access_token: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
  scope?: string;
}

export class OAuth2Client {
  public clientId: string;

  private clientSecret: string;
  private tokenEndpoint: string;
  // private authorizationEndpoint: string;

  constructor(options: OAuth2Options) {
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.tokenEndpoint = options.tokenEndpoint;
    // this.authorizationEndpoint = options.authorizationEndpoint;
  }

  public async getClientCredentials() {
    const request = new Request(this.tokenEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const response = await fetch(request);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Fetch Error", { cause: data });
    }

    const credentials = new Credentials(data as TokenResponseBody);

    return credentials;
  }
}
