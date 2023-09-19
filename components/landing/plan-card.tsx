import { Plan } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PlanCard = ({ plan }: { plan: Plan }) => {
  return (
    <div className={cn("p-8 border border-border rounded-xl")}>
      <h3 className="text-lg font-semibold text-foreground/80">{plan.title}</h3>
      <p className="text-muted-foreground mt-2">{plan.description}</p>
      <h2 className="text-muted-foreground mt-4">
        <span className="text-5xl text-foreground font-bold mr-1">
          {plan.title !== "Enterprise" && "$"}
          {plan.price}
        </span>
        {plan.title !== "Enterprise" && "/month"}
      </h2>
      <Button className="w-full my-8">{plan.button}</Button>
      <div className="space-y-3">
        {plan.features.map((feature) => (
          <div className="flex items-center space-x-2">
            <Check className="text-blue-700" />
            <span className="text-muted-foreground">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanCard;
