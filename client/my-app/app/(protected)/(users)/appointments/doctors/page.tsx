import ProtectedLayout from '@/components/layout/protectedLayout'
import Appointmentdoctorslist from '@/components/users/appointments/appointmentdoctorslist'

const AppointmentDoctorsPage = () => {
  return (
    <ProtectedLayout>
      <Appointmentdoctorslist/>
    </ProtectedLayout>
  )
}

export default AppointmentDoctorsPage
