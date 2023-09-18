"use client";

import DashboardNavbar from "@/components/navigation/dashboard-navbar";
import DashboardSidebar from "@/components/navigation/dashboard-sidebar";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import React, { ReactNode, useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar />
      <div className="md:pl-72 min-h-full max-w-full">{children}</div>
      <ModalProvider />
      <Toaster />
    </>
  );
};

export default DashboardLayout;
