"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { Link2 } from "lucide-react";
import CreateLinkModal from "../modals/create-link-modal";

const CreateLink = () => {
  const [createdLink, setCreatedLink] = useState<any | undefined>();
  const [longLink, setLongLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const origin = useOrigin();

  const onCopy = () => {
    navigator.clipboard.writeText(origin + "/l/" + createdLink.data.shortValue);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div>
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
            setIsOpen(true);
          }}
        >
          Create link
        </Button>
      </div>
      <CreateLinkModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        longLink={longLink}
        setCreatedLink={setCreatedLink}
        createdLink={createdLink}
      />
      {createdLink && (
        <>
          <Separator className="my-8" />
          <div className="p-6 bg-white rounded-xl border space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Your link</h2>
              <Button variant="secondary" onClick={onCopy} disabled={isCopied}>
                Copy
              </Button>
            </div>
            <div className="bg-gradient-to-tr text-center flex flex-col justify-center items-center from-blue-600 to-blue-900 p-7 rounded-lg text-white">
              <h6 className="text-xs font-medium text-white/70">Link by:</h6>
              <h3 className="text-lg font-bold">
                {createdLink.data.profile.name}
              </h3>
              <p className="text-xs text-white/40 mt-3 line-clamp-1">
                {createdLink.data.longLink}
              </p>
            </div>
            <div className="py-2 px-3 flex bg-white border rounded-lg">
              <Link2 className="h-5 w-5 mr-2 flex-shrink-0" />
              <p className="text-sm font-medium text-foreground/70 line-clamp-1">
                <span className="text-primary">{origin}/l/</span>
                {createdLink.data.shortValue}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateLink;
