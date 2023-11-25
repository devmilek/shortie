"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateLinkModal } from "@/hooks/use-create-link-modal";
import { Badge } from "./ui/badge";

const CreateLinkButton = () => {
  const { onOpen, isOpen, onClose } = useCreateLinkModal();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "c" && e.metaKey) {
        if (isOpen) {
          return onClose();
        }
        onOpen();
      }
    });
  });

  const handleOpen = () => {
    onOpen();
  };
  return (
    <Button variant="outline" onClick={handleOpen}>
      Create link
      <Badge variant="secondary" className="ml-3">
        CTRL + C
      </Badge>
    </Button>
  );
};

export default CreateLinkButton;
