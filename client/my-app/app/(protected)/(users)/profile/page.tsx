"use client"

import { useState } from "react"
import { UserProfileView } from "@/components/users/profile/user-profile-view"
import { UserProfileForm } from "@/components/users/profile/user-profile-form"
import ProtectedLayout from "@/components/layout/protectedLayout"

export default function UserProfilePage() {
  const [editMode, setEditMode] = useState(false)

  // Example user (replace with DB API data)
  const user = {
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi@example.com",
    phone: "9876543210",
    gender: "male",
    dob: "2000-01-15",
  }

  return (
    <ProtectedLayout title="Profile" subtitle="Manage your profile">
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information
        </p>
      </div>

      {!editMode ? (
        <UserProfileView user={user} onEdit={() => setEditMode(true)} />
      ) : (
        <UserProfileForm user={user} onCancel={() => setEditMode(false)} />
      )}
    </div>
    </ProtectedLayout>
  )
}
