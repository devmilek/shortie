import React from "react";
import { AreaChart, BarChart, Card, Title } from "@tremor/react";
import { Visitor } from "@prisma/client";

const chartdata3 = [
  {
    date: "Jan 23",
    "Distance Running": 167,
  },
  {
    date: "Feb 23",
    "Distance Running": 125,
  },
  {
    date: "Mar 23",
    "Distance Running": 156,
  },
  {
    date: "Apr 23",
    "Distance Running": 165,
  },
  {
    date: "May 23",
    "Distance Running": 153,
  },
  {
    date: "Jun 23",
    "Distance Running": 124,
  },
  {
    date: "Jul 23",
    "Distance Running": 164,
  },
  {
    date: "Aug 23",
    "Distance Running": 123,
  },
  {
    date: "Sep 23",
    "Distance Running": 132,
  },
];

interface DashboardChartProps {
  visitors: Visitor[];
}

interface ReformattedDataEntry {
  date: string;
  visitors: number;
}

const DashboardChart = ({ visitors }: DashboardChartProps) => {
  function reformatData(originalData: Visitor[]): ReformattedDataEntry[] {
    // Create an object to store visitor counts for each date
    const dateCounts: Record<string, number> = {};

    // Iterate over the original data
    originalData.forEach((entry) => {
      // Extract the date from the createdAt property
      const createdAtDate = new Date(entry.createdAt);
      const formattedDate = createdAtDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      // Increment the visitor count for the date
      dateCounts[formattedDate] = (dateCounts[formattedDate] || 0) + 1;
    });

    // If there are fewer than 7 other dates, create objects for the previous dates with visitors set to 0
    const dates = Object.keys(dateCounts);
    if (dates.length < 7) {
      const currentDate = dates[0];
      const currentDateObj = new Date(currentDate);

      for (let i = 1; i <= 7 - dates.length; i++) {
        const previousDate = new Date(currentDateObj);
        previousDate.setDate(currentDateObj.getDate() - i);
        const formattedPreviousDate = previousDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        dateCounts[formattedPreviousDate] =
          dateCounts[formattedPreviousDate] || 0;
      }
    }

    // Convert the dateCounts object into the desired array format
    const resultArray: ReformattedDataEntry[] = Object.entries(dateCounts).map(
      ([date, visitors]) => ({
        date,
        visitors,
      })
    );

    resultArray.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return resultArray;
  }

  const visitorsByDate = reformatData(visitors);

  console.log(visitors);
  return (
    <Card>
      <BarChart
        className="h-72"
        data={visitorsByDate}
        index="date"
        categories={["visitors"]}
        colors={["blue"]}
        yAxisWidth={30}
      />
    </Card>
  );
};

export default DashboardChart;
