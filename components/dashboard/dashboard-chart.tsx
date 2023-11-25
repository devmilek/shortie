"use client";

import { sortClicksByDay } from "@/lib/sortClicksByDay";
import { Visitor } from "@prisma/client";
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardChartProps {
  clicks: Visitor[];
  className?: string;
}

const DashboardChart = ({ clicks, className }: DashboardChartProps) => {
  const filteredClicks = sortClicksByDay(clicks);

  return (
    <div
      className={cn(
        "pl-0 p-6 rounded-xl border shadow border-border",
        className
      )}
    ></div>
  );
};

export default DashboardChart;
