import { LucideProps } from "lucide-react";
import React, { ComponentType, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface DashboardStatsCardProps {
  paragraph: string;
  header: string;
  Icon: ComponentType<LucideProps>;
}

const DashboardStatsCard = ({
  paragraph,
  header,
  Icon,
}: DashboardStatsCardProps) => {
  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {paragraph}
        </CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <h1 className="font-semibold text-4xl">{header}</h1>
      </CardContent>
    </Card>
  );
};

export default DashboardStatsCard;
