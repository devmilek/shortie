import { sortClicksByDay } from "@/lib/sortClicksByDay";
import { Visitor } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db";
import DashboardChart from "./dashboard-chart";

interface DashboardChartProps {
  profileId: string;
}

const DashboardChartContainer = async ({ profileId }: DashboardChartProps) => {
  const clicks = await db.visitor.findMany({
    where: {
      link: {
        profileId: profileId,
      },
      createdAt: {
        gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div
      className={cn("pl-0 p-6 rounded-xl border shadow bg-background flex-1")}
    >
      <DashboardChart visitors={clicks} />
    </div>
  );
};

export default DashboardChartContainer;
