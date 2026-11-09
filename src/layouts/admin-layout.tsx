import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import Header from "./partials/header";
import SidebarLayout from "./partials/sidebar";
import { cn } from "cn";

const AdminLayout = () => {
  return (
    <SidebarProvider
      defaultOpen={true}
      className="min-h-screen"
      style={{ "--sidebar-width-icon": "52px" } as React.CSSProperties}
    >
      <SidebarLayout />

      <SidebarInset className="min-h-screen overflow-hidden border border-border bg-background">
        <Header />

        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className={cn("mx-auto w-full", "container")}>
            <div className="min-h-[calc(100vh-140px)]">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
