import ProtectedLayout from "@/components/layout/protectedLayout";
import DoctorsList from "@/components/superadmin/doctors/doctorslist";

const Admins = () => {
  return (
    <ProtectedLayout
      title="Doctors"
      subtitle="Manage all doctors and their access."
    >
      <div className="space-y-8">
        <DoctorsList />
      </div>
    </ProtectedLayout>
  );
};

export default Admins;
