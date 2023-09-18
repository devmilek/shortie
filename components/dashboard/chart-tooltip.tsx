import React from "react";

const ChartTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background p-4">
        <h6 className="font-semibold">{label}</h6>
        <p className="text-sm">Clicks: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
