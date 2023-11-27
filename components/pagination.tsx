"use client";

import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { generatePagination } from "@/utils/generate-pagination";
import Link from "next/link";
import clsx from "clsx";

interface PaginationProps {
  totalPages: number;
}

const Pagination = ({ totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="flex">
      <Button size="icon" disabled={currentPage <= 1}>
        <Link href={createPageURL(currentPage - 1)}>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </Button>
      <div className="flex-1 flex items-center justify-center space-x-2">
        {allPages.map((page) => {
          return (
            <PaginationNumber
              key={page}
              href={createPageURL(page)}
              page={page}
              isActive={currentPage === page}
            />
          );
        })}
      </div>
      <Button size="icon" disabled={currentPage >= totalPages}>
        <Link href={createPageURL(currentPage + 1)}>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

function PaginationNumber({
  page,
  href,
  isActive,
}: {
  page: number | string;
  href: string;
  isActive: boolean;
}) {
  return (
    <Button asChild variant={isActive ? "outline" : "ghost"} size="icon">
      <Link href={href}>{page}</Link>
    </Button>
  );
}

export default Pagination;
