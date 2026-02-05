"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "@/components/ui/metricCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { activateUserService, usersListService } from "@/services/userservice";
import { User } from "@/types/users.types";
import { CheckCircle, ToggleLeft, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { toast } from "react-toastify";
import { apiErrorHandler } from "@/lib/handlers";

export default function UsersList() {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const result = await usersListService();
      setUsersList(result?.data);
    } catch (error) {
      console.log(error);
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateStatus = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await activateUserService(id);
      if (result?.data?.status === true) {
        toast.success(result?.data?.message);
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto space-y-6">
      {/*stats*/}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <MetricCard label="Total Users" value={15} Icon={User2} />
        <MetricCard label="Active Users" value={13} Icon={CheckCircle} />
      </div>

      {/*table*/}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index} className="animate-pulse">
                      <TableCell className="text-center">
                        <div className="h-4 w-4 bg-muted rounded mx-auto" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-muted" />
                          <div className="h-4 w-24 bg-muted rounded" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-32 bg-muted rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-24 bg-muted rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-16 bg-muted rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="h-4 w-16 bg-muted rounded" />
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="h-6 w-16 bg-muted rounded mx-auto" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : usersList?.length > 0 ? (
                  usersList?.map((user, index) => (
                    <TableRow
                      key={user?.email}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <div className="flex items-center justify-center rounded-full h-8 w-8 font-bold bg-primary">
                          <span>{user?.firstName[0]}</span>
                        </div>
                        {user?.firstName + " " + user?.lastName}
                      </TableCell>
                      <TableCell>{user?.email}</TableCell>
                      <TableCell>{user?.phone}</TableCell>
                      <TableCell>
                        {user?.isDeactivated ? (
                          <Badge variant="destructive">InActive</Badge>
                        ) : (
                          <Badge variant="confirmed">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(user?.createdAt).toDateString()}
                      </TableCell>
                      <TableCell className="text-left flex items-center gap-2">
                        <Button
                          variant="outline"
                          className={`border-0 text-right ${
                            user?.isDeactivated ? "" : "text-green-600"
                          }`}
                          onClick={() => {
                            handleUpdateStatus(user?.id);
                          }}
                        >
                          <ToggleLeft />
                        </Button>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
