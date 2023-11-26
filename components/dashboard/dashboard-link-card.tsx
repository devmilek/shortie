"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Link as LinkType, Profile } from "@prisma/client";
import { Separator } from "../ui/separator";
import { AlertCircle, AlertOctagon, Clock, Info } from "lucide-react";
import { formatDateString } from "@/lib/format-date";
import { Button } from "../ui/button";
import Link from "next/link";

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
      <div className="flex space-x-4 items-center">
        <img
          height={20}
          width={20}
          className="w-10 h-10"
          alt="Favicon"
          src={`https://www.google.com/s2/favicons?domain=${link.destination}&sz=64`}
        />
        <div className="flex-1 min-w-0">
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
            href={link.destination}
            className="text-sm text-muted-foreground mt-1 hover:underline transition block truncate"
          >
            {link.destination}
          </Link>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          <p className="text-sm">{formatDateString(link.createdAt)}</p>
        </div>
        <div>
          <Button variant="secondary">
            <Info className="h-4 w-4 mr-2" /> See statistics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinkCard;
