import SignUpForm from "@/app/(auth)/_components/sign-up-form";
import { Link2, LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { z } from "zod";

const SignUpPage = () => {
  return (
    <>
      <LinkIcon className="h-8 w-8 mb-8" />
      <h1 className="font-bold text-3xl">Create an account</h1>
      <p className="text-muted-foreground mb-8 mt-2">
        Enter your email below to create your account
      </p>
      <SignUpForm />
      <Link
        href="/sign-in"
        className="text-sm font-medium text-muted-foreground mt-6"
      >
        Already have an account? <span className="text-primary">Sign in</span>
      </Link>
    </>
  );
};

export default SignUpPage;
