import StatsCard from "@/app/(app)/(routes)/app/(dashboard)/_components/stats-card";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { Link2, Pointer } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import {
  MostClickedLinks,
  MostClickedLinksSkeleton,
} from "./_components/most-clicked-links";
import CreateLinkButton from "@/components/create-link-button";
import DashboardChart from "@/app/(app)/(routes)/app/(dashboard)/_components/dashboard-chart";

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
    <div className="flex min-h-full relative">
      <section className="p-9 w-full">
        {/* Statisctic cards */}
        <div className="flex w-full gap-x-6 mb-8">
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
        <Suspense fallback={<MostClickedLinksSkeleton />}>
          <MostClickedLinks />
        </Suspense>
      </section>
      {countLinks === 0 && (
        <div className="h-full w-full inset-x-0 inset-y-0 absolute bg-white/10 backdrop-blur-md flex items-center justify-center">
          <div className="p-4 bg-background border rounded-lg flex flex-col items-center justify-center container max-w-sm">
            <h1 className="text-xl font-semibold mb-4">
              You havent created any links
            </h1>
            <CreateLinkButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
