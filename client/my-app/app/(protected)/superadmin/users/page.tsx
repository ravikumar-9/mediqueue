import ProtectedLayout from '@/components/layout/protectedLayout'
import React from 'react'

const UsersList = () => {
  return (
    <ProtectedLayout>
      <UsersList/>
    </ProtectedLayout>
  )
}

export default UsersList
