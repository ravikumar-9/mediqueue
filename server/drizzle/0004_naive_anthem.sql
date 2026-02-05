CREATE TABLE "doctors_availability" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"doctor_id" uuid NOT NULL,
	"day" varchar NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"created_at" time with time zone DEFAULT now() NOT NULL,
	"updated_at" time with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "doctors_availability" ADD CONSTRAINT "doctors_availability_doctor_id_doctor_profiles_id_fk" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor_profiles"("id") ON DELETE cascade ON UPDATE no action;