"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@prisma/client";
import { columns } from "./columns";
import { useState } from "react";
import LinksTableBody from "./links-table-body";
import { LinkWithVisitorsCount } from "@/types";
import LinksTableHeader from "./links-table-header";
import LinksTablePagination from "./links-table-pagination";
import ColumnsSwitcher from "./columns-switcher";

interface DataTableProps {
  data: LinkWithVisitorsCount[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const rowsSelected = `${table.getFilteredSelectedRowModel().rows.length} of ${
    table.getFilteredRowModel().rows.length
  } row(s) selected.`;

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        {/* SEARCH */}
        <Input
          placeholder="Search short value..."
          value={
            (table.getColumn("shortValue")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("shortValue")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* COLUMNS DROPDOWN */}
        <ColumnsSwitcher table={table} />

        {/* EXPORT */}
      </div>
      <div className="rounded-md border bg-background overflow-hidden">
        <Table>
          <LinksTableHeader table={table} />
          <LinksTableBody table={table} />
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <p>{rowsSelected}</p>
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              variant="destructive"
              className="ml-2"
              onClick={() => {
                const rows: any = [];
                table.getFilteredSelectedRowModel().rows.forEach((row) => {
                  rows.push(row.original.id);
                });
                console.log(rows);
              }}
            >
              Delete selected
            </Button>
          )}
        </div>
        <LinksTablePagination table={table} />
      </div>
    </div>
  );
}
