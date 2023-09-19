import React from "react";

import dashboard from "@/assets/dashboard.png";
import dashboard_dark from "@/assets/dashboard-dark.png";
import Image from "next/image";

const Cta = () => {
  return (
    <section className="landing-container">
      <div className="w-full group bg-blue-100 dark:bg-blue-950/30 rounded-xl overflow-hidden min-h-[380px] flex items-center relative">
        <div className="max-w-lg p-16">
          <h1 className="text-4xl font-bold">
            Revolutionize your URL management
          </h1>
          <p className="text-muted-foreground text-xl mt-4">
            Start shortening your links
          </p>
        </div>
        <div className="rounded-xl border-8 absolute -bottom-20 -right-3 w-[600px] border-foreground dark:border-black group-hover:scale-110 transition">
          <Image
            className="block dark:hidden"
            src={dashboard}
            placeholder="blur"
            alt="Dashboard screenshot"
          />
          <Image
            className="hidden dark:block"
            src={dashboard_dark}
            placeholder="blur"
            alt="Dashboard screenshot"
          />
        </div>
      </div>
    </section>
  );
};

export default Cta;
