import React from "react";
import { Button } from "../ui/button";
import { LinkIcon, Menu, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashboardSidebarMobile from "./dashboard-sidebar-mobile";

const DashboardNavbar = () => {
  return (
    <div className="md:pl-72 bg-white fixed inset-x-0 w-full z-40">
      <header className="flex justify-between md:justify-end items-center border-b h-14 px-8">
        <div className="flex items-center space-x-4 md:hidden">
          <DashboardSidebarMobile />
          <Link href={"/dashboard"} className="items-center space-x-3 flex">
            <LinkIcon />
            <span className="text-xl font-black">SHORTIE</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
          <UserButton showName afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
};

export default DashboardNavbar;
