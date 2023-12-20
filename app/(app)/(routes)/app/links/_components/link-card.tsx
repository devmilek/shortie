import { BlurImage } from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GOOGLE_FAVICON_URL, HOME_DOMAIN } from "@/constants";
import { LinkWithVisitorsCount } from "@/types";
import { getApexDomain } from "@/utils/get-apex-domain";
import { getShortLink } from "@/utils/get-short-link";
import {
  ChevronRight,
  MoreHorizontalIcon,
  MoreVerticalIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import LinkCardDropdown from "./link-card-dropdown";
import { Skeleton } from "@/components/ui/skeleton";

interface LinkCardProps {
  link: LinkWithVisitorsCount;
}

const LinkCard = ({ link }: LinkCardProps) => {
  const apexDomain = getApexDomain(link.destination);
  return (
    <article className="p-6 rounded-lg bg-background flex items-center space-x-4 border shadow-md">
      <BlurImage
        src={`${GOOGLE_FAVICON_URL}${apexDomain}`}
        alt={apexDomain}
        className="h-8 w-8 rounded-full sm:h-10 sm:w-10"
        width={20}
        height={20}
      />
      <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
        <Link
          className="text-lg font-semibold text-primary truncate max-w-md hover:underline"
          href={getShortLink(link.shortValue, false)}
        >
          {getShortLink(link.shortValue)}
        </Link>
        <Link
          className="text-sm text-muted-foreground truncate max-w-md hover:underline"
          href={link.destination}
        >
          {link.destination}
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Badge variant="outline">Clicks: {link._count.visitors}</Badge>
        <LinkCardDropdown link={link} />
        {/* <Button size="icon" asChild>
          <Link href={`/links/${link.shortValue}`}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button> */}
      </div>
    </article>
  );
};

const LinkCardSkeleton = () => {
  return (
    <article className="p-6 rounded-lg bg-background flex items-center space-x-4 border">
      <Skeleton className="h-8 w-8 rounded-full sm:h-10 sm:w-10" />
      <div className="flex flex-col space-y-0.5 flex-1 min-w-0">
        <Skeleton className="h-7 max-w-md rounded-full"></Skeleton>
        <Skeleton className=" max-w-md h-5 rounded-full"></Skeleton>
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-lg"></Skeleton>
      </div>
    </article>
  );
};

export { LinkCard, LinkCardSkeleton };
