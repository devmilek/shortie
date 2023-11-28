import StatsCard from "@/components/stats-card";
import { db } from "@/lib/db";
import { Link2, Pointer } from "lucide-react";
import { unstable_noStore } from "next/cache";
import React from "react";

interface CreatedLinksCardProps {
  profileId: string;
}

const CreatedLinksCard = async ({ profileId }: CreatedLinksCardProps) => {
  const countLinks = await db.link.count({
    where: {
      profileId: profileId,
    },
  });
  return (
    <StatsCard
      Icon={Link2}
      paragraph="Created links"
      header={countLinks.toString()}
    />
  );
};

export default CreatedLinksCard;
