"use client";

import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

interface PasswordLinkProps {
  linkId: string;
}

const PasswordLink = ({ linkId }: PasswordLinkProps) => {
  const [password, setPassword] = useState("");
  const onSubmit = async () => {
    try {
      const res = await axios.post(`/api/link/${linkId}/authenticate`, {
        password,
      });
      location.replace(res.data);
    } catch (e: any) {
      toast.error(e.response.data);
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
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter password..."
            onSubmit={onSubmit}
          />
          <Button onClick={onSubmit}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default PasswordLink;
