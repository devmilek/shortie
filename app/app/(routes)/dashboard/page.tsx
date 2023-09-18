import CreateLink from "@/components/dashboard/create-link";
import DashboardChart from "@/components/dashboard/dashboard-chart";
import DashboardLinkCard from "@/components/dashboard/dashboard-link-card";
import DashboardStatsCard from "@/components/dashboard/dashboard-stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useOrigin } from "@/hooks/use-origin";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { Heading, Link2, Pointer } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const initProfile = initialProfile();

  const profile = await currentProfile();

  if (!profile) {
    redirect("/");
  }

  const countLinks = await db.link.count({
    where: {
      profileId: profile.id,
    },
  });

  const countVisitors = await db.visitor.count({
    where: {
      link: {
        profileId: profile.id,
      },
    },
  });

  const mostPopularLinks = await db.link.findMany({
    where: {
      profileId: profile.id,
    },
    orderBy: {
      visitors: {
        _count: "desc",
      },
    },
    include: {
      profile: true,
    },
    take: 3,
  });

  const clicks = await db.visitor.findMany({
    where: {
      link: {
        profileId: profile.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex min-h-full xl:pr-[400px]">
      <section className="p-9 pt-24 w-full">
        {/* Statisctic cards */}
        <div className="grid grid-cols-2 gap-4">
          <DashboardStatsCard
            Icon={Link2}
            paragraph="Created links"
            header={countLinks.toString()}
          />
          <DashboardStatsCard
            Icon={Pointer}
            paragraph="Total visitors"
            header={countVisitors.toString()}
          />
        </div>
        <DashboardChart clicks={clicks} />
        {/* Popular Links header */}
        <div className="flex items-center justify-between mt-8">
          <h2 className="text-xl font-bold">Most clicked links</h2>
          <Button variant="link">
            <Link href="/app/links">View all</Link>
          </Button>
        </div>
        {/* Display popular links */}
        <div className="space-y-4 mt-4 w-full">
          {mostPopularLinks.map((link) => (
            <DashboardLinkCard link={link} />
          ))}
        </div>
      </section>
      <section className="shadow bg-foreground/5 border-border border-l w-[400px] fixed top-0 right-0 h-screen hidden xl:block">
        <ScrollArea className="h-screen">
          <CreateLink className="p-9 pt-24" />
        </ScrollArea>
      </section>
    </div>
  );
};

export default page;
