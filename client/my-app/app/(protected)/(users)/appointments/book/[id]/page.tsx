import ProtectedLayout from "@/components/layout/protectedLayout";
import { BookAppointmentForm } from "@/components/users/appointments/bookappointment";

export default function BookAppointmentPage() {
  return (
    <ProtectedLayout>
      <BookAppointmentForm />
    </ProtectedLayout>
  );
}
