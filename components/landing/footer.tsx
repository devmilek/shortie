import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const links = [
  {
    label: "Terms",
    href: "/",
  },
  {
    label: "Privacy",
    href: "/",
  },
  {
    label: "Cookies",
    href: "/",
  },
];

const Footer = () => {
  return (
    <footer className="bg-foreground dark:bg-foreground/5">
      <div className="landing-container text-background dark:text-foreground">
        <Link href={"/"} className="flex items-center space-x-3 mr-8">
          <LinkIcon />
          <span className="text-xl font-black">SHORTIE</span>
        </Link>
        <Separator className="bg-background/10 mt-10 mb-6 dark:bg-muted" />
        <div className="w-full text-background/40 dark:text-muted-foreground flex items-center justify-between">
          <p>© 2023 Shortie. All rights reserved.</p>
          <div className="space-x-3">
            {links.map((item) => (
              <Link
                key={item.href}
                className="text-background/40 dark:text-muted-foreground hover:text-background/60 hover:underline transition hover:underline-offset-2"
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
