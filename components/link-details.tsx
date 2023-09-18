"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { AlertTriangle, Calendar, Link2, Lock, Trash } from "lucide-react";
import QrCard from "./qr-card";
import Link from "next/link";
import { formatDateString } from "@/lib/format-date";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Link as LinkType, Profile } from "@prisma/client";
import { cn } from "@/lib/utils";
import { LinkWithProfile } from "@/types";
import { useLastCreatedLink } from "@/hooks/use-last-created-link";
import { Icons } from "./icons";
import { useModal } from "@/hooks/use-modal-store";

interface LinkDetailsProps {
  link: LinkWithProfile;
  className?: string;
}

const LinkDetails = ({ link, className }: LinkDetailsProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const { onOpen } = useModal();

  const origin = useOrigin();

  const onCopy = () => {
    navigator.clipboard.writeText(origin + "/l/" + link.shortValue);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="p-6 bg-background border-border rounded-xl border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">Your link</h2>
          <Button variant="secondary" onClick={onCopy} disabled={isCopied}>
            Copy
          </Button>
        </div>
        <div className="bg-gradient-to-tr text-center flex flex-col justify-center items-center from-blue-600 to-blue-900 p-7 rounded-lg text-white">
          <h6 className="text-xs font-medium text-white/70">Link by:</h6>
          <h3 className="text-lg font-bold">{link.profile.name}</h3>
          <p className="text-xs text-white/40 mt-3 truncate max-w-[200px]">
            {link.longLink}
          </p>
        </div>
        <div className="py-2 px-3 flex bg-background border-border border rounded-lg">
          <Link2 className="h-5 w-5 mr-2 flex-shrink-0" />
          <p className="text-sm font-medium text-foreground/70 line-clamp-1 max-w-[230px] ">
            <span className="text-primary">{origin}/l/</span>
            {link.shortValue}
          </p>
        </div>
      </div>
      <QrCard shortValue={link.shortValue} />
      <div className="p-6 bg-background border-border rounded-xl border space-y-4">
        <div className="flex items-center">
          <h2 className="font-bold">Details</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <p className="font-medium">
              Created at:{" "}
              <span className="font-normal text-muted-foreground">
                {formatDateString(link.createdAt)}
              </span>
            </p>
          </div>
          <div className="flex">
            <Link2 className="mr-2 mt-1 h-5 w-5" />
            <p className="font-medium">
              Long link:{" "}
              <Link
                href={link.longLink}
                className="font-normal truncate line-clamp-1 max-w-[220px] text-muted-foreground underline"
                target="_blank"
              >
                Link to page
              </Link>
            </p>
          </div>
          {link.expiresAt && (
            <div className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              <p className="font-medium">
                Expires at:{" "}
                <span className="font-normal text-muted-foreground">
                  {formatDateString(link.expiresAt)}
                </span>
              </p>
            </div>
          )}
          {link.password && (
            <div className="flex items-center">
              <Lock className="mr-2 h-5 w-5" />
              <p className="font-medium">
                Password:{" "}
                <span className="font-normal text-muted-foreground">
                  {link.password}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 bg-background border-border rounded-xl border grid">
        <Button
          variant={"destructive"}
          onClick={() => {
            console.log(link);
            onOpen("deleteLinkModal", { link });
          }}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default LinkDetails;
