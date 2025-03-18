import { encodeBase64 } from "@oslojs/encoding";

export function generateState() {
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);
  return encodeBase64(randomValues)
}