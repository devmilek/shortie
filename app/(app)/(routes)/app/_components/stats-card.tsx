import { LucideProps } from "lucide-react";
import React, { ComponentType } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  paragraph: string;
  header: string;
  Icon: ComponentType<LucideProps>;
}

const StatsCard = ({ paragraph, header, Icon }: StatsCardProps) => {
  return (
    <Card>
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

export default StatsCard;
