"use client";

import { sortClicksByDay } from "@/lib/sortClicksByDay";
import { Visitor } from "@prisma/client";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import ChartTooltip from "./chart-tooltip";
import { ChartCursor } from "./chart-cursor";

const DashboardChart = ({ clicks }: { clicks: Visitor[] }) => {
  const filteredClicks = sortClicksByDay(clicks);

  return (
    <div className="pl-0 p-6 rounded-xl border mt-6 shadow border-border">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={filteredClicks}>
          <XAxis
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
            }}
            cursor={<ChartCursor />}
            wrapperClassName="bg-pink-400"
            content={<ChartTooltip />}
          />
          <CartesianGrid className="stroke-border rounded-xl" />
          <Bar
            dataKey="clicks"
            className="fill-blue-600 dark:fill-blue-700"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
