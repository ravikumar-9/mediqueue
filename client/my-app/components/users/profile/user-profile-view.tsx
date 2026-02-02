"use client"

import Image from "next/image"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, User, Calendar, BadgeCheck } from "lucide-react"

export function UserProfileView({
  user,
  onEdit,
}: {
  user: any
  onEdit: () => void
}) {
  return (
    <div className="space-y-6">

      {/* Gradient Header Card */}
      <div className="w-full rounded-3xl p-8 bg-linear-to-r from-primary/20 to-primary/5 shadow border">
        <div className="flex flex-col items-center gap-4 text-center">

          {/* Avatar */}
          <div className="relative">
            <Image
              src={user.avatar ?? "/placeholder-user.jpg"}
              alt="Avatar"
              width={130}
              height={130}
              className="rounded-full shadow-2xl border-4 border-white"
            />
            <BadgeCheck className="absolute bottom-0 right-0 h-7 w-7 text-primary bg-white rounded-full shadow" />
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-muted-foreground text-sm">
              Personal Profile & Account Info
            </p>
          </div>

          <Button className="rounded-xl px-6 py-2 mt-2" onClick={onEdit}>
            Edit Profile
          </Button>

        </div>
      </div>

      {/* Details Card */}
      <Card className="rounded-3xl shadow-lg border border-border/40 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Profile Details
          </CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <ProfileField
            icon={<Mail className="h-4 w-4 text-primary" />}
            label="Email"
            value={user.email}
          />
          <ProfileField
            icon={<Phone className="h-4 w-4 text-primary" />}
            label="Phone Number"
            value={user.phone}
          />
          <ProfileField
            icon={<User className="h-4 w-4 text-primary" />}
            label="Gender"
            value={user.gender}
          />
          <ProfileField
            icon={<Calendar className="h-4 w-4 text-primary" />}
            label="Date of Birth"
            value={user.dob}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileField({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl border border-border/90 bg-card shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-semibold text-base">{value}</p>
    </div>
  )
}
