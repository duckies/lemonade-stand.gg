import { Database as SQLite } from "bun:sqlite";
import { Database } from "@hocuspocus/extension-database";
import { Server } from "@hocuspocus/server";

const database = new SQLite(":memory:");

database.exec(`CREATE TABLE IF NOT EXISTS "documents" (
  "slug" varchar(255) NOT NULL,
  "data" blob NOT NULL,
  UNIQUE(slug)
)`);

const selectQuery = database.query(
  'SELECT data FROM "documents" WHERE slug = $slug ORDER BY rowid DESC',
);

const upsertQuery = database.query(
  'INSERT INTO "documents" ("slug", "data") VALUES ($name, $data) ON CONFLICT(slug) DO UPDATE SET data = $data',
);

const server = Server.configure({
  port: 1234,
  extensions: [
    new Database({
      fetch: async ({ documentName }) => {
        return new Promise((resolve, reject) => {
          const rows = selectQuery.all({ $slug: documentName });
          resolve(rows);
        });
      },
      store: async ({ documentName, state }) => {
        return new Promise((resolve, reject) => {
          upsertQuery.run({ $slug: documentName, $data: state });
          resolve();
        });
      },
    }),
  ],
});

server.listen();
