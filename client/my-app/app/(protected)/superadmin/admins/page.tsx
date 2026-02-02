import ProtectedLayout from "@/components/layout/protectedLayout";
import AdminsList from "@/components/superadmin/admins/adminslist";

const Admins = () => {
  return (
    <ProtectedLayout
      title="Admins"
      subtitle="Manage all admins and their access."
    >
      <div className="space-y-8">
        <AdminsList />
      </div>
    </ProtectedLayout>
  );
};

export default Admins;
