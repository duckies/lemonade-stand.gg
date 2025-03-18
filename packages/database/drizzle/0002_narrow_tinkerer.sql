ALTER TABLE "accounts" DROP CONSTRAINT "accounts_provider_providerId_unique";
--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "provider_id" to "provider_user_id";
--> statement-breakpoint
ALTER TABLE "accounts" RENAME COLUMN "provider" to "provider_id";
--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_id_provider_user_id_index" ON "accounts" USING btree ("provider_id","provider_user_id");
--> statement-breakpoint
