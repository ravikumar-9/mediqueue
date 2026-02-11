import ProtectedLayout from '@/components/layout/protectedLayout'
import UserAppointmentsList from '@/components/users/appointments/appointmentsList'


const UserAppointments = () => {
  return (
    <ProtectedLayout>
      <UserAppointmentsList/>
    </ProtectedLayout>
  )
}

export default UserAppointments
