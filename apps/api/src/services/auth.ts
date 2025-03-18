import { type Session, type User, db, sessions, users } from "@lemonade-stand/database";
import { sha256 } from "@oslojs/crypto/sha2";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { AuthConfig } from "config";
import { eq } from "drizzle-orm";

export type SessionValidationResult =
  | { user: User; session: Session }
  | { user: null; session: null };

export async function createSession(token: string, userId: string): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + AuthConfig.session.maxAge),
  } satisfies Session;

  await db.insert(sessions).values(session);

  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const [row] = await db
    .select({ user: users, session: sessions })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, sessionId));

  if (!row) {
    return { session: null, user: null };
  }

  const { user, session } = row;

  // Session expiration.
  if (Date.now() > session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
    return { session: null, user: null };
  }

  // Session persistence; refresh after `refreshThreshold` has passed.
  if (Date.now() > session.expiresAt.getTime() - AuthConfig.session.refreshThreshold) {
    session.expiresAt = new Date(Date.now() + AuthConfig.session.maxAge);

    await db
      .update(sessions)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessions.id, sessionId));
  }

  return { user, session };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sessionId));
}

export async function invalidateAllSessions(userId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.userId, userId));
}
