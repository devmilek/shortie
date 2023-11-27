import { Link } from "@prisma/client";
import React from "react";
import LinkCard from "./link-card";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { ITEMS_PER_PAGE } from "@/constants";

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

export default LinksFeed;
