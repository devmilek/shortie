import DashboardLinkCard from "@/components/dashboard/dashboard-link-card";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { LinkWithVisitorsCount } from "@/types";
import { Link as PrismaLink, Profile } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

export const revalidate = 1;

interface MostClickedLinksProps {
  profileId: string;
}

const MostClickedLinks = async ({ profileId }: MostClickedLinksProps) => {
  noStore();
  const popularLinks = await db.link.findMany({
    where: {
      profileId: profileId,
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
  });
  return (
    <>
      <div className="flex items-center justify-between mt-8">
        <h2 className="text-xl font-bold">Most clicked links</h2>
        <Button variant="link">
          <Link href="/app/links">View all links</Link>
        </Button>
      </div>
      {popularLinks.length > 0 ? (
        <div className="space-y-4 mt-4 w-full">
          {popularLinks.map((link) => (
            <DashboardLinkCard key={link.id} link={link} />
          ))}
        </div>
      ) : (
        <div>{/* TODO: Empty state */}</div>
      )}
    </>
  );
};

export default MostClickedLinks;
