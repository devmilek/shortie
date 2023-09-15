import DashboardNavbar from "@/components/navigation/dashboard-navbar";
import DashboardSidebar from "@/components/navigation/dashboard-sidebar";
import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full">
      <DashboardNavbar />
      <div className="hidden md:block">
        <DashboardSidebar />
      </div>
      <div className="pt-14 md:pl-72 h-full">{children}</div>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;
