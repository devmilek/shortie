import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { NavbarNav } from "./navbar-nav";
import { Button } from "../../../components/ui/button";
import { ThemeToggle } from "../../../components/theme-toggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="border-b border-border backdrop-blur-md bg-white/50 dark:bg-black/50 fixed inset-x-0 top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 flex items-center h-16">
        <Link href={"/"} className="flex items-center space-x-3 mr-8">
          <LinkIcon />
          <span className="text-xl font-black">SHORTIE</span>
        </Link>
        <NavbarNav />
        <div className="ml-auto space-x-2 flex items-center">
          <ThemeToggle />
          {session ? (
            <>
              <Button variant="ghost">Sign out</Button>
              <Button>
                <Link href={"/app"}>Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
