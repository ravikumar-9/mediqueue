"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { registerSchema, registerSchemaType } from "@/schema/auth.schema";
import { registerService } from "@/services/authservice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputWithIcon from "../ui/inputwithicon";
import { Lock, Mail, Phone, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      dateOfBirth: "",
    },
  });

  const onSubmit = async (values: registerSchemaType) => {
    try {
      const response = await registerService(values);
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        router.push("/login");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      const response=error?.response;
      toast.error(response?.data?.message)
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto flex items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-xl border border-border shadow-lg rounded-xl p-4">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold text-primary tracking-tight">
            Create Account
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Join <span className="text-primary font-medium">MediQueue</span> and
            book appointments seamlessly.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>First Name</FormLabel>
                    <FormControl>
                      <InputWithIcon
                        Icon={User}
                        placeholder="John"
                        className="bg-background"
                        {...field}
                      />
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
                    <FormLabel required>Last Name</FormLabel>
                    <FormControl>
                      <InputWithIcon
                      Icon={User}
                        placeholder="Doe"
                        className="bg-background h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GENDER */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Gender</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="h-8 py-0.5 w-full">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DATE OF BIRTH */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className="bg-background h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Email</FormLabel>
                    <FormControl>
                      <InputWithIcon
                      Icon={Mail}
                        placeholder="you@example.com"
                        type="email"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Password</FormLabel>
                    <FormControl>
                      <InputWithIcon
                      Icon={Lock}
                        placeholder="Create a strong password"
                        type="password"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PHONE */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Phone Number</FormLabel>
                    <FormControl>
                      <InputWithIcon
                         Icon={Phone}
                        placeholder="9876543210"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-white font-semibold mt-2 rounded-lg"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground mt-2 pb-2">
          Already have an account?
          <a
            className="ml-1 text-primary font-medium hover:underline"
            href="/login"
          >
            Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
