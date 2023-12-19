import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import React from "react";

const CreatedLinksCard = async () => {
  const session = await getServerSession(authOptions);
  return <div>CreatedLinksCard</div>;
};

export default CreatedLinksCard;
