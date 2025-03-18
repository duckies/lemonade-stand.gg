import * as v from "valibot";

export const OAuthCallbackSchema = v.object({
  code: v.string(),
  state: v.string(),
});

export type OAuthCallback = v.InferOutput<typeof OAuthCallbackSchema>;

export const OAuthCredentialsSchema = v.object({
  access_token: v.string(),
  token_type: v.string(),
  expires_in: v.pipe(
    v.number(),
    v.transform((v) => new Date(Date.now() + v * 1000)),
    v.date(),
  ),
  refresh_token: v.string(),
  scope: v.string(),
});

export type OAuthCredentials = v.InferOutput<typeof OAuthCredentialsSchema>;
