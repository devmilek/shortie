"use client";

import { sidebarNavItems } from "@/constants/navigation";
import { LinkIcon, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { handleSignOut } from "@/lib/sign-out";

const DashboardSidebar = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={cn(
        "w-72 border-r h-full fixed flex-col inset-y-0 z-50 bg-background border-border px-6 py-8",
        className
      )}
    >
      <Link href={"/"} className="flex items-center space-x-3 mb-8">
        <LinkIcon />
        <span className="text-xl font-black">SHORTIE</span>
      </Link>
      <nav className="space-y-5 flex-1">
        <div className="space-y-2">
          {sidebarNavItems.map((item) => (
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
      <Button
        className="w-full justify-start"
        variant="secondary"
        size="lg"
        onClick={() => {
          handleSignOut();
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log out
      </Button>
    </aside>
  );
};

export default DashboardSidebar;
