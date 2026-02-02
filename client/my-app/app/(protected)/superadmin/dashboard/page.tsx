import ProtectedLayout from '@/components/layout/protectedLayout'
import { AppointmentsChart } from '@/components/superadmin/dashboard/appointmentschart'
import { UsersDoctorsChart } from '@/components/superadmin/dashboard/doctorchart'
import Stats from '@/components/superadmin/dashboard/stats'
import { AppointmentStatusChart } from '@/components/superadmin/dashboard/statuschart'

const SuperAdminPage = () => {
  return (
    <ProtectedLayout title='Dashboard' subtitle='Manage all trends and users'>
    <div className='space-y-8'>
      <Stats/>
      <AppointmentsChart/>
      <AppointmentStatusChart/>
      <UsersDoctorsChart/>
    </div>
    </ProtectedLayout>
  )
}

export default SuperAdminPage
