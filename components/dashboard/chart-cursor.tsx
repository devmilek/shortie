import { Rectangle } from "recharts";

export const ChartCursor = (props: any) => {
  const { x, y, width, height, stroke } = props;
  return (
    <Rectangle
      className="fill-foreground/5 stroke-foreground/5"
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
};
