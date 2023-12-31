import React from "react";
import { Button } from "../ui/button";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import DashboardSidebarMobile from "./dashboard-sidebar-mobile";
import { ThemeToggle } from "../theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import UserButton from "../user-button";
import CreateLinkButton from "../create-link-button";

const DashboardNavbar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return (
    <div className="lg:pl-72 bg-background top-0 fixed inset-x-0 w-full z-40">
      <header className="flex justify-between lg:justify-end items-center border-b h-14 px-8 border-border">
        <div className="flex items-center space-x-4 lg:hidden">
          <DashboardSidebarMobile />
          <Link href={"/dashboard"} className="items-center space-x-3 flex">
            <LinkIcon />
            <span className="text-xl font-black">SHORTIE</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <ThemeToggle />
          <CreateLinkButton />
          <UserButton user={session.user} />
        </nav>
      </header>
    </div>
  );
};

export default DashboardNavbar;
