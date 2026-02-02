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
import { CheckCircle, User } from "lucide-react";

interface Admin {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const admins: Admin[] = [
  {
    id: "1",
    name: "Ravi Kumar",
    email: "ravi@example.com",
    phone: "+91 9876543210",
    role: "Admin",
    createdAt: "2025-01-10",
  },
  {
    id: "2",
    name: "Srinivas",
    email: "sri@example.com",
    phone: "+91 9876501234",
    role: "Admin",
    createdAt: "2025-01-14",
  },
];

export default function AdminsList() {
  return (
    <div className="mx-auto space-y-6">
      {/* ================= METRIC CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard label="Total Doctors" value={15} Icon={User} />

        <MetricCard label="Active Admins" value={13} Icon={CheckCircle} />
      </div>

      {/* ================= ADMINS TABLE ================= */}
      <Card>
  <CardHeader>
    <CardTitle>Admin List</CardTitle>
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
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {admins.map((admin, index) => (
            <TableRow
              key={admin.id}
              className="hover:bg-muted/40 transition-colors"
            >
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="font-medium">{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phone}</TableCell>
              <TableCell>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                  {admin.role}
                </span>
              </TableCell>
              <TableCell>{admin.createdAt}</TableCell>

              <TableCell className="text-right">
                <Button variant="outline" size="sm">
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
