import DashboardNavbar from "@/components/navigation/dashboard-navbar";
import DashboardSidebar from "@/components/navigation/dashboard-sidebar";
import ModalProvider from "@/components/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next/types";
import React, { ReactNode, useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "SHORTIE APP - Tiny Links, Big Results!",
  description:
    "Effortlessly shorten, customize, and track your links using SHORTIE. Make the most of your online presence with our powerful URL management tool.",
  keywords: [
    "Link Shortener",
    "URL Management",
    "Shortened Links",
    "URL Tracking",
    "Simplify URLs",
    "Customized Links",
    "Shareable Links",
  ],
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DashboardNavbar />
      <DashboardSidebar className="hidden md:flex" />
      <div className="md:pl-72 min-h-full max-w-full">{children}</div>
      <ModalProvider />
      <Toaster />
    </>
  );
};

export default DashboardLayout;
