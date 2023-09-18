"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Link as LinkType, Profile } from "@prisma/client";
import { Separator } from "../ui/separator";
import { AlertCircle, AlertOctagon, Clock, Info } from "lucide-react";
import { formatDateString } from "@/lib/format-date";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import LinkDetails from "./link-details";
import { ScrollArea } from "../ui/scroll-area";

const DashboardLinkCard = ({
  link,
}: {
  link: LinkType & {
    profile: Profile;
  };
}) => {
  const origin = useOrigin();
  return (
    <div className="space-y-4 p-6 border rounded-xl shadow border-border">
      <div>
        <Link
          href={origin + "/l/" + link.shortValue}
          className="text-lg font-semibold group block truncate"
          target="_blank"
        >
          <span className="text-blue-600 group-hover:underline transition">
            {origin}/
          </span>
          <span className="group-hover:underline transition">
            l/{link.shortValue}
          </span>
        </Link>
        <Link
          target="_blank"
          href={link.longLink}
          className="text-sm text-muted-foreground mt-1 hover:underline transition block truncate"
        >
          {link.longLink}
        </Link>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <p className="text-sm">{formatDateString(link.createdAt)}</p>
        </div>
        <div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">
                <Info className="h-4 w-4 mr-2" /> See details
              </Button>
            </SheetTrigger>
            <SheetContent className="px-0">
              <ScrollArea className="h-screen pb-10">
                <LinkDetails className="px-6 py-6" link={link} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinkCard;
