"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const ToasterProvider = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      richColors
      closeButton
      theme={theme as "light" | "dark" | "system" | undefined}
    />
  );
};

export default ToasterProvider;
