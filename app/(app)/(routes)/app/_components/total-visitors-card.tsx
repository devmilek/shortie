import StatsCard from "@/components/stats-card";
import { db } from "@/lib/db";
import { Pointer } from "lucide-react";
import { unstable_noStore } from "next/cache";
import React from "react";

interface TotalVisitorsCardProps {
  profileId: string;
}

const TotalVisitorsCard = async ({ profileId }: TotalVisitorsCardProps) => {
  const countVisitors = await db.visitor.count({
    where: {
      link: {
        profileId: profileId,
      },
    },
  });
  return (
    <StatsCard
      Icon={Pointer}
      paragraph="Total visitors"
      header={countVisitors.toString()}
    />
  );
};

export default TotalVisitorsCard;
