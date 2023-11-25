import * as React from "react";
import { DataTable } from "@/components/links/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const links = await db.link.findMany({
    where: {
      profileId: session.user.id,
    },
    include: {
      _count: {
        select: {
          visitors: true,
        },
      },
    },
  });

  return (
    <div className="p-6">
      <DataTable data={links} />
    </div>
  );
}
