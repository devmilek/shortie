import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import PasswordLink from "@/components/password-link";
import LinkLogic from "./_components/link-logic";

interface PageProps {
  params: {
    shortValue: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const link = await db.link.findUnique({
    where: {
      shortValue: params.shortValue,
    },
  });

  if (!link) {
    return notFound();
  }

  const now = new Date();

  return (
    <LinkLogic
      linkId={link.id}
      destination={link.hashedPassword ? "" : link.destination}
    />
  );
};

export default Page;
