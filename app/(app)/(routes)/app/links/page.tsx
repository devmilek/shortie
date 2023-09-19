import * as React from "react";
import { DataTable } from "@/components/links/data-table";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function Page() {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const links = await db.link.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      _count: {
        select: {
          visitors: true,
        },
      },
      profile: true,
    },
  });

  return (
    <div className="p-6 pt-16">
      <DataTable data={links} />
    </div>
  );
}
