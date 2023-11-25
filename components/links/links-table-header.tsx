"use client";

import React from "react";
import { Table, flexRender } from "@tanstack/react-table";
import { LinkWithVisitorsCount } from "@/types";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface LinksTableHeaderProps {
  table: Table<LinkWithVisitorsCount>;
}

const LinksTableHeader = ({ table }: LinksTableHeaderProps) => {
  return (
    <TableHeader className="bg-foreground/10">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default LinksTableHeader;
