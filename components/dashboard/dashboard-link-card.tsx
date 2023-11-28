"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Link as LinkType, Profile } from "@prisma/client";
import { Separator } from "../ui/separator";
import {
  AlertCircle,
  AlertOctagon,
  ChevronRight,
  Clock,
  Info,
  Pointer,
} from "lucide-react";
import { formatDateString } from "@/lib/format-date";
import { Button } from "../ui/button";
import Link from "next/link";
import { BlurImage } from "../blur-image";
import { getApexDomain } from "@/utils/get-apex-domain";
import { GOOGLE_FAVICON_URL } from "@/constants";
import { getShortLink } from "@/utils/get-short-link";
import { LinkWithVisitorsCount } from "@/types";
import { Card } from "../ui/card";

const DashboardLinkCard = ({ link }: { link: LinkWithVisitorsCount }) => {
  const apexDomain = getApexDomain(link.destination);
  return (
    <Card className="space-y-4 p-6 border rounded-xl shadow border-border">
      <div className="flex space-x-4 items-center">
        <BlurImage
          src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
          alt={apexDomain}
          className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
          width={20}
          height={20}
        />
        <div className="flex-1 min-w-0">
          <Link
            href={getShortLink(link.shortValue, false)}
            className="text-lg font-semibold group block truncate text-primary hover:underline transition-all"
            target="_blank"
          >
            {getShortLink(link.shortValue, true)}
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
        <div className="flex space-x-4">
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <p className="text-sm">{formatDateString(link.createdAt)}</p>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Pointer className="w-4 h-4 mr-2" />
            <p className="text-sm">Clicks: {link._count.visitors}</p>
          </div>
        </div>
        <div>
          <Button variant="secondary">
            See details <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default DashboardLinkCard;
