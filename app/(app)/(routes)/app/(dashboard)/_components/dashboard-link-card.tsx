"use client";

import { useOrigin } from "@/hooks/use-origin";
import { Link as LinkType, Profile } from "@prisma/client";
import {
  AlertCircle,
  AlertOctagon,
  ChevronRight,
  Clock,
  Info,
  Pointer,
} from "lucide-react";
import { formatDateString } from "@/lib/format-date";
import Link from "next/link";
import { getApexDomain } from "@/utils/get-apex-domain";
import { GOOGLE_FAVICON_URL } from "@/constants";
import { getShortLink } from "@/utils/get-short-link";
import { LinkWithVisitorsCount } from "@/types";
import { BlurImage } from "@/components/blur-image";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardLinkCard = ({ link }: { link: LinkWithVisitorsCount }) => {
  const origin = useOrigin();
  const apexDomain = getApexDomain(link.destination);
  return (
    <div className="space-y-4 p-6 border rounded-xl shadow border-border bg-background">
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
    </div>
  );
};

const DashboardLinkCardSkeleton = () => {
  return (
    <div className="space-y-4 p-6 border rounded-xl shadow bg-background">
      <div className="flex space-x-4 items-center">
        <Skeleton className="h-8 w-8 rounded-full sm:h-10 sm:w-10" />
        <div className="flex-1 min-w-0">
          <Skeleton className="h-7 w-1/3"></Skeleton>
          <Skeleton className="h-5 w-1/2"></Skeleton>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 max-w-xs w-full" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};

export { DashboardLinkCard, DashboardLinkCardSkeleton };
