import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import PasswordLink from "@/components/password-link";
import Test from "./_components/test";

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

  Test();

  // const visitor = await db.visitor.create({
  //   data: {
  //     LinkId: link.id,
  //   },
  // });

  const now = new Date();

  if (link.expiresAt && link.expiresAt < now) {
    return notFound();
  }

  if (link.hashedPassword) {
    return <PasswordLink linkId={link.id} />;
  }

  if (link) {
    return redirect(link.destination);
  }
};

export default Page;
