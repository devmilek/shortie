import DashboardChartContainer from "@/components/dashboard/dashboard-chart-container";
import { authOptions } from "@/lib/auth-options";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import MostClickedLinks from "./_components/most-clicked-links";
import StatsCardSkeleton from "./_components/stats-card-skeleton";
import TotalVisitorsCard from "./_components/total-visitors-card";
import CreatedLinksCard from "./_components/created-links-card";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-full">
      <section className="p-9 w-full">
        {/* Statisctic cards */}
        hellod
        <div className="flex w-full gap-x-6">
          <DashboardChartContainer profileId={session.user.id} />
          <div className="grid gap-4 w-96">
            <Suspense fallback={<StatsCardSkeleton />}>
              <CreatedLinksCard profileId={session.user.id} />
            </Suspense>
            <Suspense fallback={<StatsCardSkeleton />}>
              <TotalVisitorsCard profileId={session.user.id} />
            </Suspense>
          </div>
        </div>
        {/* Popular Links header */}
        <Suspense>
          <MostClickedLinks profileId={session.user.id} />
        </Suspense>
      </section>
    </div>
  );
};

export default page;
