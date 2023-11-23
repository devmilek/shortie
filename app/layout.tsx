import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster, toast } from "sonner";
import SessionProvider from "@/components/providers/session-provider";
import ToasterProvider from "@/components/providers/toaster-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SHORTIE - Tiny Links, Big Results!",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ToasterProvider />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
