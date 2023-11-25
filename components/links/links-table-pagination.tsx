"use client";

import { LinkWithVisitorsCount } from "@/types";
import { Table } from "@tanstack/react-table";
import React from "react";
import { Button } from "../ui/button";

interface LinkTablePaginationProps {
  table: Table<LinkWithVisitorsCount>;
}

const LinkTablePagination = ({ table }: LinkTablePaginationProps) => {
  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

export default LinkTablePagination;
