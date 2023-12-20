import {
  DashboardLinkCard,
  DashboardLinkCardSkeleton,
} from "@/app/(app)/(routes)/app/(dashboard)/_components/dashboard-link-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { LinkWithVisitorsCount } from "@/types";
import { Link as PrismaLink, Profile } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

async function getLinks() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const links = await db.link.findMany({
    where: {
      profileId: session.user.id,
      // OR: [
      //   {
      //     expiresAt: {
      //       gte: new Date(),
      //     },
      //   },
      //   {
      //     expiresAt: {
      //       equals: null,
      //     },
      //   },
      // ],
    },
    orderBy: {
      visitors: {
        _count: "desc",
      },
    },
    include: {
      profile: true,
      _count: {
        select: {
          visitors: true,
        },
      },
    },
    take: 3,
  });

  return links;
}

const MostClickedLinks = async () => {
  const links = await getLinks();
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Most clicked links</h2>
        <Button variant="link">
          <Link href="/app/links">View all links</Link>
        </Button>
      </div>
      {links.length > 0 ? (
        <div className="space-y-4 mt-4 w-full">
          {links.map((link) => (
            <DashboardLinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div>{/* TODO: Empty state */}</div>
      )}
    </>
  );
};

const MostClickedLinksSkeleton = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 max-w-xs w-full" />
        <Skeleton className="h-5 max-w-xs w-full" />
      </div>
      <div className="space-y-4 mt-4 w-full">
        {[...Array(3)].map((_, i) => (
          <DashboardLinkCardSkeleton key={i} />
        ))}
      </div>
    </>
  );
};

export { MostClickedLinks, MostClickedLinksSkeleton };
