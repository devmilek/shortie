"use client";

import { SidebarNavItems } from "@/constants/navigation";
import { LinkIcon, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";
import { SignOutButton } from "@clerk/nextjs";
import { Badge } from "../ui/badge";

const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-72 border-r h-full fixed hidden md:flex flex-col inset-y-0 z-50 bg-background border-border px-6 py-8">
      <Link href={"/dashboard"} className="flex items-center space-x-3 mb-8">
        <LinkIcon />
        <span className="text-xl font-black">SHORTIE</span>
      </Link>
      <nav className="space-y-5 flex-1">
        <div className="space-y-2">
          {SidebarNavItems.map((item) => (
            <Button
              key={item.href}
              className="w-full justify-start"
              size="lg"
              variant={item.href === pathname ? "default" : "ghost"}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
                {item.isPro && (
                  <Badge className="ml-auto" color="yellow">
                    Pro
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
        </div>
        <Separator />
        <Button
          className="w-full justify-start"
          size="lg"
          variant={"/settings" === pathname ? "default" : "ghost"}
          asChild
        >
          <Link href={"/settings"}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Link>
        </Button>
      </nav>
      <SignOutButton>
        <Button className="w-full justify-start" variant="secondary" size="lg">
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </Button>
      </SignOutButton>
    </aside>
  );
};

export default DashboardSidebar;
