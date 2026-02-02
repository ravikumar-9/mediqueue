"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";

// Fake Data
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "pending";
  createdAt: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Akhil",
    email: "akhil@example.com",
    phone: "+91 9999888877",
    status: "active",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Meghana",
    email: "megha@example.com",
    phone: "+91 8877665544",
    status: "pending",
    createdAt: "2025-01-12",
  },
  {
    id: "3",
    name: "Rahul",
    email: "rahul@example.com",
    phone: "+91 9988776655",
    status: "inactive",
    createdAt: "2025-01-14",
  },
];

export default function UsersList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "active" | "inactive" | "pending">("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "all" ? true : user.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto py-10 space-y-10">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Users</h1>
        <p className="text-muted-foreground mt-2">
          Manage your platform users, their status, and details.
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-muted-foreground text-sm">All users registered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {users.filter((u) => u.status === "active").length}
            </p>
            <p className="text-muted-foreground text-sm">Users currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {users.filter((u) => u.status === "pending").length}
            </p>
            <p className="text-muted-foreground text-sm">Awaiting approval</p>
          </CardContent>
        </Card>

      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">

        {/* SEARCH */}
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* STATUS FILTER */}
        <div className="flex gap-3">
          {["all", "active", "inactive", "pending"].map((s) => (
            <Button
              key={s}
              variant={status === s ? "default" : "outline"}
              onClick={() => setStatus(s as any)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>

      </div>

      {/* USERS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="rounded-md border">

            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}

                {filteredUsers.map((user, index) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/40 transition-colors"
                  >
                    <TableCell className="text-center">{index + 1}</TableCell>

                    <TableCell className="font-medium">{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>{user.phone}</TableCell>

                    <TableCell>
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
                          user.status === "active" &&
                            "bg-green-100 text-green-700",
                          user.status === "inactive" &&
                            "bg-gray-200 text-gray-700",
                          user.status === "pending" &&
                            "bg-yellow-100 text-yellow-700"
                        )}
                      >
                        {user.status}
                      </span>
                    </TableCell>

                    <TableCell>{user.createdAt}</TableCell>

                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
