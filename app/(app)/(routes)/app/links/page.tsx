import * as React from "react";
import { DataTable } from "@/components/links/data-table";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import SearchInput from "./_components/search-input";
import Pagination from "@/components/pagination";
import { ITEMS_PER_PAGE } from "@/constants";
import { Suspense } from "react";
import { LinksFeed, LinksFeedSkeleton } from "./_components/links-feed";
import Image from "next/image";
import { Icons } from "@/components/icons";
import CreateLinkButton from "@/components/create-link-button";

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
  const currentPage = Number(searchParams?.page) || 1;

  const totalLinks = await db.link.count({
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
  });

  const totalPages = Math.ceil(totalLinks / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your links</h1>
        <SearchInput />
      </header>
      {totalLinks > 0 ? (
        <div className="space-y-3 my-8">
          <Suspense fallback={<LinksFeedSkeleton />}>
            <LinksFeed query={query} currentPage={currentPage} />
          </Suspense>
        </div>
      ) : (
        <div className="p-10">
          <div className="p-4 bg-background border rounded-lg flex flex-col items-center justify-center container max-w-sm">
            <h1 className="text-xl font-semibold mb-4">
              You havent created any links
            </h1>
            <CreateLinkButton />
          </div>
        </div>
      )}
      {totalLinks > 0 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
