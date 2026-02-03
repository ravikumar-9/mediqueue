import ProtectedLayout from "@/components/layout/protectedLayout";
import UsersList from "@/components/users/userslist";
import React from "react";

const UserList = () => {
  return (
    <ProtectedLayout title="Users List">
      <UsersList />
    </ProtectedLayout>
  );
};

export default UserList;
