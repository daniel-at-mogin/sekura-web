import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import sidebaritems from "./items";
import NavCollapse from "./nav-collapse";
import FullLogo from "./logos";

const SidebarLayout = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/auth");
  };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="sidebar-box **:data-[slot=sidebar-inner]:bg-background **:data-[slot=sidebar-inner]:border **:data-[slot=sidebar-inner]:border-border group-data-[state=collapsed]:hover:shadow-xl"
      side="left"
    >
      <SidebarHeader className="flex flex-row items-center justify-between border-b border-border p-3 group-data-[collapsible=icon]:px-2.5">
        <FullLogo />
      </SidebarHeader>

      <SidebarContent className="overflow-y-auto overflow-x-hidden group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:overflow-x-hidden">
        <SidebarGroup className="flex items-center justify-center px-3 py-4 group-data-[collapsible=icon]:px-2">
          <div className="flex w-full flex-col gap-4 px-0">
            <NavCollapse menu={sidebaritems} className="text-sm" />
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-3">
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-center gap-2 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:px-0"
              >
                <LogOut className="size-4" />
                <span className="group-data-[collapsible=icon]:hidden">
                  Logout
                </span>
              </Button>
            }
          />

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Log out?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be signed out of the admin panel and redirected to the
                login page.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleLogout}>
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarLayout;
