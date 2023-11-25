"use client";

import { Card } from "@/components/ui/card";
import { useCreateLinkModal } from "@/hooks/use-create-link-modal";
import React from "react";

const CreateLinkCta = () => {
  const { isOpen } = useCreateLinkModal();
  return <Card></Card>;
};

export default CreateLinkCta;
