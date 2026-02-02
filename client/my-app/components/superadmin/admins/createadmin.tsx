"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createDoctorSchema,
  CreateDoctorFormValues,
} from "@/schema/admin.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export function CreateDoctorForm() {
  const form = useForm<CreateDoctorFormValues>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      specialization: "",
      experience: 1,
      slots: [{ start: "", end: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "slots",
    control: form.control,
  });

  const onSubmit = (values: CreateDoctorFormValues) => {
    console.log("Doctor Data:", values);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Create Doctor</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the doctor's details and set up their available time slots.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12"
        >
          {/* =============== SECTION 1: Personal Details =============== */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Doctor Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specialization */}
              <FormField
                control={form.control}
                name="specialization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specialization</FormLabel>
                    <FormControl>
                      <Input placeholder="Cardiologist, Dermatologist..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="doctor@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Experience */}
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience (Years)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* =============== SECTION 2: Time Slots =============== */}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Available Time Slots</h2>

            <div className="space-y-4">
              {fields.map((fieldItem, index) => (
                <div
                  key={fieldItem.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                >
                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name={`slots.${index}.start`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* End Time */}
                  <FormField
                    control={form.control}
                    name={`slots.${index}.end`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove */}
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ start: "", end: "" })}
              >
                + Add Time Slot
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">
              Create Doctor
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
