import {
  boolean,
  date,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const stores = pgTable(
  "stores",
  {
    address: text("address").notNull(),
    addressEn: text("address_en").notNull(),
    city: text("city").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    email: text("email").notNull(),
    id: text("id").primaryKey(),
    latitude: doublePrecision("latitude").notNull(),
    longitude: doublePrecision("longitude").notNull(),
    name: text("name").notNull(),
    nameEn: text("name_en").notNull(),
    phone: text("phone").notNull(),
    slug: text("slug").notNull(),
  },
  (table) => [uniqueIndex("stores_slug_unique").on(table.slug)],
);

export const plans = pgTable(
  "plans",
  {
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    description: text("description").notNull(),
    durationHours: integer("duration_hours").notNull(),
    heroImageUrl: text("hero_image_url"),
    id: text("id").primaryKey(),
    isActive: boolean("is_active").default(true).notNull(),
    name: text("name").notNull(),
    price: integer("price").notNull(),
    scene: text("scene").notNull(),
    slug: text("slug").notNull(),
  },
  (table) => [uniqueIndex("plans_slug_unique").on(table.slug)],
);

export const planStores = pgTable(
  "plan_stores",
  {
    id: text("id").primaryKey(),
    isActive: boolean("is_active").default(true).notNull(),
    onlinePrice: integer("online_price"),
    planId: text("plan_id")
      .notNull()
      .references(() => plans.id, { onDelete: "cascade" }),
    storeId: text("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    walkInPrice: integer("walk_in_price"),
  },
  (table) => [
    uniqueIndex("plan_stores_plan_store_unique").on(
      table.planId,
      table.storeId,
    ),
  ],
);

export const bookingDrafts = pgTable("booking_drafts", {
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  guestEmail: text("guest_email").notNull(),
  guestName: text("guest_name").notNull(),
  guestPhone: text("guest_phone").notNull(),
  id: text("id").primaryKey(),
  notes: text("notes"),
  planId: text("plan_id")
    .notNull()
    .references(() => plans.id, { onDelete: "restrict" }),
  status: text("status").default("draft").notNull(),
  storeId: text("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "restrict" }),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  visitDate: date("visit_date").notNull(),
});
