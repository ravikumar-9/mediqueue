"use client"
import {  ChevronUp, Home, Inbox, Settings, User2 } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { usePathname } from "next/navigation"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: Inbox,
  },
  {
    title: "Account",
    url: "/profile",
    icon: Settings,
  },
]

export function AppSidebar() {
  const path=usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-center text-primary text-lg border-b shadow-none p-3">MediQueue</SidebarGroupLabel>
          <SidebarGroupContent className="mt-6">
            <SidebarMenu>
              {items?.map((item) => (
                <SidebarMenuItem key={item?.title} className="font-bold">
                  <SidebarMenuButton asChild  className={
                         path===item?.url
                        ? "bg-primary text-primary-foreground font-semibold"
                        : ""
                    }>
                    <a href={item?.url}>
                      <item.icon />
                      <span>{item?.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> John
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}