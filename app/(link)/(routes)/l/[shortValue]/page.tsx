import { useOrigin } from "@/hooks/use-origin";
import { db } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { LinkIcon } from "lucide-react";
import PasswordLink from "@/components/password-link";

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

  const visitor = await db.visitor.create({
    data: {
      LinkId: link.id,
    },
  });

  const now = new Date();

  if (link.expiresAt && link.expiresAt < now) {
    return notFound();
  }

  if (link.password) {
    return <PasswordLink longLink={link.longLink} password={link.password} />;
  }

  // if (link) {
  //   return redirect(link.longLink);
  // }

  // const link = await axios.get("/api/link/" + params.shortValue);

  return (
    <div>
      <h1 className="text-3xl font-bold">{params.shortValue}</h1>
      {/* <p>{JSON.stringify(link)}</p> */}
    </div>
  );
};

export default Page;
