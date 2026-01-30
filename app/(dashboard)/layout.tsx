"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/SideBarProvider" // Verifica que la ruta de importación sea correcta
import { NavBarProvider } from "@/components/NavBarProvider";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSideBar />
        <main className="flex-1">
          {/* El Trigger es el botón para colapsar el menú */}
            <NavBarProvider/>
            {children}
        </main>
      </div>
    </SidebarProvider>
  )
}