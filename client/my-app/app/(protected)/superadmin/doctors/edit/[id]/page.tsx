import ProtectedLayout from "@/components/layout/protectedLayout";
import { EditDoctorForm } from "@/components/superadmin/doctors/editdoctor";

const CreateDoctor = () => {
  return (
    <ProtectedLayout
      title="Doctor Registration"
      subtitle="Register a new doctor and assign clinic hours for patient appointments."
    >
      <EditDoctorForm />
    </ProtectedLayout>
  );
};

export default CreateDoctor;
