
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton

} from "@/components/ui/sidebar"
import { Home } from "lucide-react"
import { UserMenu } from "@/components/DropDownProvider"


const Items = [
  { title: "Inicio", href: "/", icon: Home }
]

export function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup title="Menú">
          <SidebarGroupContent> 
            <SidebarMenu>
              {Items.map((item) => (
                <SidebarMenuItem 
                  key={item.title}
                >
                  <SidebarMenuButton>
                    <Link href={item.href} className="flex justify-center items-center">
                      <item.icon className="mr-2 size-3" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

              ))}
            </SidebarMenu>          
          </SidebarGroupContent>
        </SidebarGroup>
        
      </SidebarContent>
      <SidebarFooter>
        <UserMenu/>
      </SidebarFooter>
    </Sidebar>
  )
}