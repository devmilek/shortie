import * as React from "react";
import { DataTable } from "@/components/links/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import SearchInput from "./_components/search-input";
import LinkCard from "./_components/link-card";

interface PageProps {
  searchParams?: {
    query?: string;
    page?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const query = searchParams?.query || "";

  const links = await db.link.findMany({
    where: {
      profileId: session.user.id,
      OR: [
        {
          shortValue: {
            contains: query,
          },
        },
        {
          destination: {
            contains: query,
          },
        },
      ],
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
      {/* <DataTable data={links} /> */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your links</h1>
        <SearchInput />
      </header>
      <div>
        {links.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </div>
  );
}
