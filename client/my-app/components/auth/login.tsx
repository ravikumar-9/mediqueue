"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/auth.schema";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { loginService } from "@/services/authservice";
import { toast } from "react-toastify";
import { Loader, Lock, Mail } from "lucide-react";
import InputWithIcon from "../ui/inputwithicon";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const form = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: loginSchemaType) => {
    try {
      const result = await loginService(values);
      if (result?.data?.status === true) {
        const role=result?.data?.data?.role
        localStorage.setItem("role", role);
        if (role==="superadmin"){
          router.replace("/superadmin/dashboard")
        }
        toast.success(result?.data?.message);
      } else {
        toast.error(result?.data?.message);
      }
    } catch (error) {
      const response = error?.response;
      toast.error(response?.data?.message);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md border border-border shadow-lg rounded-xl p-4">
        {/* HEADER */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-extrabold text-primary tracking-tight">
            MediQueue
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Welcome back! Please log in to continue.
          </CardDescription>
        </CardHeader>

        {/* FORM CONTENT */}
        <CardContent className="mt-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium" required>
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <InputWithIcon
                        Icon={Mail}
                        placeholder="you@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium" required>
                      Password
                    </FormLabel>
                    <FormControl>
                      <InputWithIcon
                        Icon={Lock}
                        placeholder="Enter your password.."
                        type="password"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />

                    {/* Forgot password */}
                    <div className="flex justify-end mt-1">
                      <a
                        href="/forgot-password"
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full text-white font-semibold mt-2 rounded-lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader className="animate-spin" />
                )}
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* FOOTER */}
        <CardFooter className="flex justify-center text-sm text-muted-foreground mt-4 pb-4">
          <span>Don't have an account?</span>
          <a
            className="ml-1 text-primary font-medium hover:underline"
            href="/register"
          >
            Register
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
