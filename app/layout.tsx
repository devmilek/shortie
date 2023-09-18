import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
    <ClerkProvider>
      <html lang="en">
        <body className="bg-background">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
