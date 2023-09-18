"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

interface PasswordLinkProps {
  longLink: string;
  password: string;
}

const PasswordLink = ({ longLink, password }: PasswordLinkProps) => {
  const [passwordModel, setPasswordModel] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = () => {
    if (passwordModel !== password) {
      setErrorMsg("Invalid password");
    } else {
      setErrorMsg("");
      location.replace(longLink);
    }
  };

  return (
    <div className="h-full flex items-center flex-col justify-center">
      <div className="max-w-xs text-center flex items-center flex-col">
        <Link href="/" className="flex items-center space-x-2">
          <LinkIcon className="w-8 h-8" />
          <span className="text-2xl font-black">SHORTIE</span>
        </Link>
        <p className="text-muted-foreground mt-3">
          This link is password protected, please enter your password to
          continue
        </p>
        <div className="flex space-x-2 mt-4">
          <Input
            onChange={(e) => {
              setPasswordModel(e.target.value);
            }}
            placeholder="Enter password..."
            onSubmit={onSubmit}
          />
          <Button onClick={onSubmit}>Continue</Button>
        </div>
        <p className="text-start text-sm text-red-700 mt-4">{errorMsg}</p>
      </div>
    </div>
  );
};

export default PasswordLink;
