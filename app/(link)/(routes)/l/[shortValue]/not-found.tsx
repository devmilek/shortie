import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <h1 className="font-extrabold text-[480px] text-foreground/5 absolute pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        404
      </h1>
      <div className="text-center">
        <h1 className="text-6xl font-bold">We lost this page</h1>
        <p className="text-muted-foreground mt-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-4 space-x-2">
          <Button asChild variant="secondary">
            <Link href="/app/dashboard">Dashboard</Link>
          </Button>
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
