import {AppSidebar} from "@/components/app-sidebar";
import SidebarInfo from "@/components/sidebar-info";
import {Separator} from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex  justify-between">
          <div className="flex items-center gap-2 ml-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div>
            <SidebarInfo />
          </div>
        </header>

        <div className="flex min-h-screen flex-col justify-center items-center">
          <p>ini untuk admin</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
