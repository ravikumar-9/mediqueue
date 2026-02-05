import ProtectedLayout from "@/components/layout/protectedLayout";
import DoctorDetailsPage from "@/components/superadmin/doctors/doctordetails";

const DoctorDetails = () => {
  return (
    <ProtectedLayout
      title="Doctors"
      subtitle="Manage all doctors and their access."
    >
      <div className="space-y-8">
        <DoctorDetailsPage />
      </div>
    </ProtectedLayout>
  );
};

export default DoctorDetails;
