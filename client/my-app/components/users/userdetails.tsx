"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiErrorHandler } from "@/lib/handlers";
import { getUserByIdService } from "@/services/userservice";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

type userDetailsType = {
  id: string;
  isDeactivated: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "Male" | "Female" | "other";
};

const UserDetails = () => {
  //hooks
  const { id } = useParams<{ id: string }>();

  //state
  const [userDetails, setUserDetails] = useState<userDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      if (id) {
        setIsLoading(true);
        const response = await getUserByIdService(id);
        setUserDetails(response?.data?.data);
      }
    } catch (error) {
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!userDetails && !isLoading) {
    return (
      <p className="text-center py-10 text-muted-foreground">No user found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            {userDetails?.firstName} {userDetails?.lastName}
          </h1>
          <p className="text-muted-foreground mt-1">User Profile</p>
        </div>

        <Badge
          variant={userDetails?.isDeactivated ? "destructive" : "confirmed"}
          className="capitalize"
        >
          {userDetails?.isDeactivated ? "InActive" : "Active"}
        </Badge>
      </div>

      {/* User Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground">First Name</p>
            <p className="font-medium">{userDetails?.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Last Name</p>
            <p className="font-medium">{userDetails?.lastName}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{userDetails?.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{userDetails?.phone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p className="font-medium capitalize">{userDetails?.gender}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;
