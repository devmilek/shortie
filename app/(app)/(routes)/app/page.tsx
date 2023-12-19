import DashboardChart from "@/components/dashboard/dashboard-chart";
import StatsCard from "@/app/(app)/(routes)/app/_components/stats-card";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { Link2, Pointer } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import MostClickedLinks from "./_components/most-clicked-links";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const countLinks = await db.link.count({
    where: {
      profileId: session.user.id,
    },
  });

  const countVisitors = await db.visitor.count({
    where: {
      link: {
        profileId: session.user.id,
      },
    },
  });

  const mostPopularLinks = await db.link.findMany({
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

  const clicks = await db.visitor.findMany({
    where: {
      link: {
        profileId: session.user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex min-h-full">
      <section className="p-9 w-full">
        {/* Statisctic cards */}
        hellod
        <div className="flex w-full gap-x-6">
          <DashboardChart className="flex-1" clicks={clicks} />
          <div className="grid gap-4 w-96">
            <StatsCard
              Icon={Link2}
              paragraph="Created links"
              header={countLinks.toString()}
            />
            <StatsCard
              Icon={Pointer}
              paragraph="Total visitors"
              header={countVisitors.toString()}
            />
          </div>
        </div>
        {/* Popular Links header */}
        <MostClickedLinks links={mostPopularLinks} />
      </section>
    </div>
  );
};

export default page;
