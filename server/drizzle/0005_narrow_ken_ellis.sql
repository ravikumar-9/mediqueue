ALTER TABLE "doctor_profiles" DROP CONSTRAINT "doctor_profiles_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "doctor_profiles" ADD CONSTRAINT "doctor_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;