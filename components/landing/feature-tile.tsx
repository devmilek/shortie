import { Feature } from "@/types";
import Image from "next/image";
import React from "react";

const FeatureTile = ({ feature }: { feature: Feature }) => {
  return (
    <article
      id={feature.slug}
      className="grid gap-24 grid-cols-2 odd:flex-row-reverse items-center"
    >
      <div className={feature.id % 2 ? "order-1" : ""}>
        <div className="rounded-full bg-blue-100 text-blue-700 h-10 w-10 flex items-center justify-center ring-8 ring-blue-50 dark:ring-blue-950 dark:bg-blue-800 dark:text-blue-100">
          <feature.icon className="h-6 w-6" />
        </div>
        <h2 className="font-bold text-3xl mt-6">{feature.title}</h2>
        <p className="text-lg text-muted-foreground mt-4">{feature.content}</p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-900 p-12 rounded-2xl group">
        <Image
          src={feature.image}
          alt={feature.title}
          className="block dark:hidden border-8 rounded-xl border-foreground shadow-xl w-full group-hover:scale-110 transition"
        />
        <Image
          src={feature.darkImage}
          alt={feature.title}
          className="hidden dark:block border-8 rounded-xl border-black shadow-xl w-full group-hover:scale-110 transition"
        />
      </div>
    </article>
  );
};

export default FeatureTile;
