import type { TokenResponseBody } from "./client";

export interface CredentialOptions extends TokenResponseBody {
  /**
   * Token expiration tolerance in seconds to account for jitter.
   * The default considers the token expired 15 seconds early to avoid
   * any issues with batched requests.
   *
   * Negative tolerances expire credentials early.
   * @default -15
   */
  tolerance?: number;
}

export class Credentials {
  public readonly accessToken: string;
  public readonly tokenType?: string;
  public readonly expiresIn?: number;
  public readonly expiresAt?: Date;
  public readonly refreshToken?: string;
  public readonly scope?: string;
  public readonly issuedAt?: Date;
  public tolerance: number;

  constructor(options: CredentialOptions) {
    this.accessToken = options.access_token;
    this.tokenType = options.token_type;
    this.expiresIn = options.expires_in;
    this.refreshToken = options.refresh_token;
    this.tolerance = options.tolerance || -15;
    this.expiresAt = this.expiresIn ? new Date(Date.now() + (this.expiresIn + this.tolerance) * 1000) : undefined;
  }

  /**
   * If an `expires_in` field was provided, this method returns `false`
   * when the token is expired. If no `expires_in` field was provided,
   * we assume the token never expires and we returns `false`.
   */
  get isExpired(): boolean {
    if (this.expiresAt) {
      return this.expiresAt <= new Date();
    }

    return false;
  }
}
