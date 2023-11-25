import React from "react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { Table, flexRender } from "@tanstack/react-table";
import { LinkWithVisitorsCount } from "@/types";

interface LinksTableBodyProps {
  table: Table<LinkWithVisitorsCount>;
}

const LinksTableBody = ({ table }: LinksTableBodyProps) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={0} className="h-24 text-center">
            No results.
            {/* TODO: craete empty state ui */}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default LinksTableBody;
