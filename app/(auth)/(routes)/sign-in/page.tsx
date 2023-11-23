import SignInForm from "@/app/(auth)/_components/sign-in-form";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <LinkIcon className="h-8 w-8 mb-8" />
      <h1 className="font-bold text-3xl">Welcome back</h1>
      <p className="text-muted-foreground mb-8 mt-2">
        Enter your email below to sign in.
      </p>
      <SignInForm />
      <Link
        href="/sign-up"
        className="text-sm font-medium text-muted-foreground mt-6"
      >
        You dont have an account?{" "}
        <span className="text-primary">Create account</span>
      </Link>
    </>
  );
};

export default page;
