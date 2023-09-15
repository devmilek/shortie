import CreateLink from "@/components/dashboard/create-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialProfile } from "@/lib/initial-profile";
import React from "react";

const page = () => {
  const profile = initialProfile();

  return (
    <div className="flex h-full">
      <div className="w-full p-9">asd</div>
      <section className="w-[640px] bg-accent border-l h-full p-9">
        <CreateLink />
      </section>
    </div>
  );
};

export default page;
