CREATE TABLE "booking_drafts" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"guest_email" text NOT NULL,
	"guest_name" text NOT NULL,
	"guest_phone" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"notes" text,
	"plan_id" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"store_id" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"visit_date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plan_stores" (
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"online_price" integer,
	"plan_id" text NOT NULL,
	"store_id" text NOT NULL,
	"walk_in_price" integer
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"duration_hours" integer NOT NULL,
	"hero_image_url" text,
	"id" text PRIMARY KEY NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"scene" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"address" text NOT NULL,
	"address_en" text NOT NULL,
	"city" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"email" text NOT NULL,
	"id" text PRIMARY KEY NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"name" text NOT NULL,
	"name_en" text NOT NULL,
	"phone" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "booking_drafts" ADD CONSTRAINT "booking_drafts_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking_drafts" ADD CONSTRAINT "booking_drafts_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_stores" ADD CONSTRAINT "plan_stores_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plan_stores" ADD CONSTRAINT "plan_stores_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "plan_stores_plan_store_unique" ON "plan_stores" USING btree ("plan_id","store_id");--> statement-breakpoint
CREATE UNIQUE INDEX "plans_slug_unique" ON "plans" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "stores_slug_unique" ON "stores" USING btree ("slug");