import ProtectedLayout from "@/components/layout/protectedLayout";
import { CreateDoctorForm } from "@/components/superadmin/doctors/createdoctor";

const CreateDoctor = () => {
  return (
    <ProtectedLayout
      title="Doctor Registration"
      subtitle="Register a new doctor and assign clinic hours for patient appointments."
    >
      <CreateDoctorForm />
    </ProtectedLayout>
  );
};

export default CreateDoctor;
