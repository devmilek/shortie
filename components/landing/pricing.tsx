import React from "react";
import SectionTitle from "./section-title";
import { Plan } from "@/types";
import PlanCard from "./plan-card";

const plans: Plan[] = [
  {
    title: "Basic plan",
    price: "0",
    description: "A basic plan for shortening links.",
    button: "Get started",
    features: [
      "Up to 100 active links",
      "Password protection",
      "Link expiration date management",
      "QR Code generation",
      "Link visitors dashboard",
    ],
  },
  {
    title: "Pro plan",
    price: "2",
    description: "Advanced features and reporting.",
    button: "Upgrade now",
    features: [
      "Up to 10.000 active links",
      "Visit advanced analytics",
      "Technical Support",
      "Newest features",
    ],
  },
  {
    title: "Enterprise",
    price: "Custom",
    description: "Unlimited features.",
    button: "Contact sales",
    features: [
      "Unlimited active links",
      "Free and Unlimited Usage",
      "Custom reporting tools",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="landing-container" id="plans">
      <SectionTitle
        subheading="Pricing"
        heading="Plans that fit your scale"
        content="Simple, transparent pricing that grows with you. Try any plan free for 30 days."
      />
      <div className="grid grid-cols-3 gap-8 mt-12">
        {plans.map((plan) => (
          <PlanCard plan={plan} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
