import React from 'react'
import { AppSidebar } from '../app-sidebar';
import { ModeToggle } from '../toggle-theme';
import { SidebarTrigger } from '../ui/sidebar';

const ProtectedLayout = ({children,title,subtitle}:{children:React.ReactNode,title?:string,subtitle?:string}) => {
  return (
    <>
    <AppSidebar />
      <main className="w-full">
        <header className='bg-primary/10 border-b shadow px-2 py-3 sticky top-0 backdrop-blur z-40'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
          <SidebarTrigger/>
            <div>
            <h2 className='text-xl font-bold'>{title && title}</h2>
            <p className='font-normal text-sm'>{subtitle && subtitle}</p>
            </div>
            </div>
          <ModeToggle/>
          </div>
        </header>
        <main className='px-6 py-6'>
        {children}
        </main>
      </main>
    </>
  )
}

export default ProtectedLayout;
