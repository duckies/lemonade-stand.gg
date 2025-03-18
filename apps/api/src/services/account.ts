import { type Account, type Provider, accounts, db } from "@lemonade-stand/database";
import { and, eq } from "drizzle-orm";

export const getAccountByProviderID = async (provider: Provider, providerId: string) =>
  db
    .select()
    .from(accounts)
    .where(and(eq(accounts.providerId, provider), eq(accounts.providerUserId, providerId)))
    .then((r) => r.at(0) ?? null);

export async function updateAccount(account: Account, data: Partial<Account>): Promise<Account>;
export async function updateAccount(accountId: string, data: Partial<Account>): Promise<Account>;
export async function updateAccount(
  accountOrId: Account | string,
  data: Partial<Account>,
): Promise<Account> {
  if (typeof accountOrId === "string") {
    return db
      .update(accounts)
      .set(data)
      .where(eq(accounts.id, accountOrId))
      .returning()
      .then((r) => r.at(0)!);
  }

  await db.update(accounts).set(data).where(eq(accounts.id, accountOrId.id));

  return Object.assign(accountOrId, data);
}
