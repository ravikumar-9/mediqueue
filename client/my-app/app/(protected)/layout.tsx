import { SidebarProvider} from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      {/* <AppSidebar />
      <main className="w-full py-6 px-6"> */}
        {children}
      {/* </main> */}
    </SidebarProvider>
  )
}