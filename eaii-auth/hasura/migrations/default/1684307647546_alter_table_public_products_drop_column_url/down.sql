alter table "public"."products" alter column "url" drop not null;
alter table "public"."products" add column "url" text;
