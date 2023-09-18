import { useOrigin } from "@/hooks/use-origin";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import axios from "axios";

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
    return <div>No i klops</div>;
  }

  const visitor = await db.visitor.create({
    data: {
      LinkId: link.id,
    },
  });

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
