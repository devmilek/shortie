import { cn } from "@/lib/utils";
import React from "react";

interface SectionTitleProps {
  subheading: string;
  heading: string;
  content: string;
  className?: string;
}

const SectionTitle = ({
  subheading,
  heading,
  content,
  className,
}: SectionTitleProps) => {
  return (
    <div className={className}>
      <h2 className="font-semibold text-blue-600">{subheading}</h2>
      <h1 className="text-4xl font-bold mt-2">{heading}</h1>
      <p className="mt-4 text-xl text-muted-foreground">{content}</p>
    </div>
  );
};

export default SectionTitle;
