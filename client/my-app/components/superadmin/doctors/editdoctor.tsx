"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createDoctorSchema,
  CreateDoctorFormValues,
  Day,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiErrorHandler } from "@/lib/handlers";
import {
  createDoctorService,
  getDoctorDetailsService,
  updateDoctorService,
} from "@/services/doctorservice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Availability = {
  day: string;
  startTime: string;
  endTime: string;
};

type DoctorDetails = {
  firstName: string;
  lastName: string;
  specialization: string;
  experience?: number;
  phone: string;
  email: string;
  createdAt: string;
  isDeactivated: boolean;
  availability: Availability[];
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function EditDoctorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [doctor, setDoctor] = useState<DoctorDetails | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) fetchDoctorDetails(id);
  }, []);

  const fetchDoctorDetails = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await getDoctorDetailsService(id);
      if (response?.data?.status) {
        setDoctor(response.data.data);
      }
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<CreateDoctorFormValues>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      specialization: "",
      experience: "0",
      availability: [{day:"Monday",startTime:"",endTime:""}],
    },
    values:doctor?{
      firstName: doctor?.firstName,
      lastName: doctor?.lastName,
      email: doctor?.email,
      phone: doctor?.phone,
      specialization: doctor?.specialization,
      experience: doctor?.experience?.toString() ?? "0",
      availability: doctor?.availability?.map((avail) => ({
        day: avail?.day as Day,
        startTime: avail?.startTime,
        endTime: avail?.endTime,
      })),
    }
    :
    undefined
  });

  const { fields, append, remove } = useFieldArray({
    name: "availability",
    control: form.control,
  });

  const onSubmit = async (values: CreateDoctorFormValues) => {
    try {
      const response = await updateDoctorService(id,values);
      toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
      apiErrorHandler(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 text-muted-foreground">
        Loading doctor details...
      </div>
    );
  }
  

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">
          Edit Doctor Details
        </h1>
        <p className="text-muted-foreground mt-2">
          Fill in the doctor's details and weekly availability.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          {/*personal information*/}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Anita" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Sharma" {...field} />
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
                      <Input placeholder="Cardiology" {...field} />
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
                      <Input placeholder="9876543210" {...field} />
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
                      <Input
                        type="number"
                        min={0}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
          </div>

          {/*availability*/}
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Weekly Availability</h2>

            <div className="space-y-4">
              {fields?.map((item, index) => (
                <div
                  key={item?.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
                >
                  {/* Day */}
                  <FormField
                    control={form.control}
                    name={`availability.${index}.day`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Day</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DAYS.map((day) => (
                              <SelectItem key={day} value={day}>
                                {day}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Start Time */}
                  <FormField
                    control={form.control}
                    name={`availability.${index}.startTime`}
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
                    name={`availability.${index}.endTime`}
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
                onClick={() =>
                  append({
                    day: "Monday",
                    startTime: "",
                    endTime: "",
                  })
                }
              >
                + Update Availability
              </Button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={form.formState.isSubmitting}
            >
              Update Doctor Details
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
