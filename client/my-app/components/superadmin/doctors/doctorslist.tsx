"use client";

import { TableSkeletonRows } from "@/components/skeleton-loader";
import { Badge } from "@/components/ui/badge";
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
import { apiErrorHandler } from "@/lib/handlers";
import {
  getDoctorsListService,
  updateDoctorStatusService,
} from "@/services/doctorservice";
import { CheckCircle, CirclePlus, Edit, Eye, ToggleLeft, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DoctorsList() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLaoding, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const fetchDoctorsList = async () => {
    try {
      setIsLoading(true);
      const response = await getDoctorsListService({ skip, limit: 10 });
      setDoctorsList(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
      apiErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorsList();
  }, []);

  const handleUpdateStatus = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await updateDoctorStatusService(id);
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        fetchDoctorsList();
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
      <div className="flex items-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full gap-6">
          <MetricCard label="Total Doctors" value={15} Icon={User} />

          <MetricCard label="Active Admins" value={13} Icon={CheckCircle} />
        </div>
        <Link href="/superadmin/doctors/create">
          <Button variant="primary">
            <CirclePlus />
            Add Doctor
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctors List</CardTitle>
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
                  <TableHead>Specialization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLaoding ? (
                  <TableSkeletonRows rows={5} length={8} />
                ) : doctorsList?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center py-10 text-muted-foreground"
                    >
                      No doctors found
                    </TableCell>
                  </TableRow>
                ) : (
                  doctorsList?.map(
                    (
                      doctor: {
                        id: string;
                        email: string;
                        firstName: string;
                        lastName: string;
                        createdAt: string;
                        updatedAt:string;
                        isDeactivated: boolean;
                        phone: string;
                        specialization: string;
                      },
                      index: number
                    ) => (
                      <TableRow
                        key={doctor?.id}
                        className="hover:bg-muted/40 transition-colors"
                      >
                        <TableCell className="text-center">
                          {index + 1}
                        </TableCell>

                        <TableCell className="font-medium">
                          {doctor?.firstName} {doctor?.lastName}
                        </TableCell>

                        <TableCell>{doctor?.email}</TableCell>

                        <TableCell>{doctor?.phone}</TableCell>

                        <TableCell>
                          <Badge variant="default">
                            {doctor?.specialization}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          {doctor?.isDeactivated ? (
                            <Badge variant="destructive">Inactive</Badge>
                          ) : (
                            <Badge variant="confirmed">Active</Badge>
                          )}
                        </TableCell>

                        <TableCell>
                          {doctor?.createdAt
                            ? new Date(doctor?.updatedAt).toLocaleString()
                            : "-"}
                        </TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center gap-3">
                            <Link href={`/superadmin/doctors/${doctor?.id}`}>
                            <Button variant="outline">
                              <Eye />
                            </Button>
                            </Link>
                            <Button
                              variant="outline"
                              onClick={() => {
                                handleUpdateStatus(doctor?.id);
                              }}
                            >
                              <ToggleLeft />
                            </Button>
                            <Link href={`/superadmin/doctors/edit/${doctor?.id}`}>
                            <Button variant="outline">
                             <Edit/>
                            </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
