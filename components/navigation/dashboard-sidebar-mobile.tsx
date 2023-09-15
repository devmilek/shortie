import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import DashboardSidebar from "./dashboard-sidebar";

const DashboardSidebarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default DashboardSidebarMobile;
