import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const profile = await initialProfile();

  return redirect("/app/dashboard");
};

export default Page;
