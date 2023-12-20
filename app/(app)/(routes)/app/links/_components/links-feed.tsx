import { Link } from "@prisma/client";
import React from "react";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { ITEMS_PER_PAGE } from "@/constants";
import { LinkCard, LinkCardSkeleton } from "./link-card";

interface LinksFeedProps {
  query: string;
  currentPage: number;
}

const LinksFeed = async ({ query, currentPage }: LinksFeedProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

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
    take: ITEMS_PER_PAGE,
    skip: offset,
  });
  return (
    <>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </>
  );
};

const LinksFeedSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <LinkCardSkeleton key={i} />
      ))}
    </>
  );
};

export { LinksFeed, LinksFeedSkeleton };
