import ProtectedLayout from "@/components/layout/protectedLayout";
import { CreateDoctorForm } from "@/components/superadmin/admins/createadmin";

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
