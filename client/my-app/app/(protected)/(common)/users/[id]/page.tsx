import ProtectedLayout from "@/components/layout/protectedLayout";
import UserDetails from "@/components/users/userdetails";

const UserList = () => {
  return (
    <ProtectedLayout title="Users List">
      <UserDetails />
    </ProtectedLayout>
  );
};

export default UserList;
