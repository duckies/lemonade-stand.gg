ALTER TABLE "sessions" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "sessions" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "profile" json NOT NULL;--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "token";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "ip_address";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "user_agent";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "sessions" DROP COLUMN "updated_at";