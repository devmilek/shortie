import DashboardLinkCard from "@/components/dashboard/dashboard-link-card";
import { Button } from "@/components/ui/button";
import { LinkWithVisitorsCount } from "@/types";
import { Link as PrismaLink, Profile } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface MostClickedLinksProps {
  links: LinkWithVisitorsCount[];
}

const MostClickedLinks = ({ links }: MostClickedLinksProps) => {
  return (
    <>
      <div className="flex items-center justify-between mt-8">
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

export default MostClickedLinks;
