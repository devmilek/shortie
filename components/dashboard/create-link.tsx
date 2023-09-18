"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import LinkDetails from "../link-details";
import { useModal } from "@/hooks/use-modal-store";
import { useLastCreatedLink } from "@/hooks/use-last-created-link";

const CreateLink = ({ className }: { className?: string }) => {
  const [longLink, setLongLink] = useState("");
  const { onOpen } = useModal();
  const { link } = useLastCreatedLink();

  return (
    <div className={className}>
      <h2 className="text-xl font-bold">Create new link</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Create, short and manage your links
      </p>
      <div className="flex space-x-2 mt-8">
        <Input
          placeholder="Enter a long link..."
          value={longLink}
          onChange={(e) => {
            setLongLink(e.target.value);
          }}
        />
        <Button
          type="submit"
          className="whitespace-nowrap"
          onClick={() => {
            setLongLink("");
            onOpen("createLinkModal");
          }}
        >
          Create link
        </Button>
      </div>
      {link && (
        <>
          <Separator className="my-8" />
          <LinkDetails link={link} />
        </>
      )}
    </div>
  );
};

export default CreateLink;
