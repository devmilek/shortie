import { Link } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronRight, LockIcon } from "lucide-react";
import { formatDateString } from "@/lib/format-date";
import { Button } from "../ui/button";
import { useCreateLinkModal } from "@/hooks/use-create-link-modal";

export const columns: ColumnDef<
  Link & {
    _count: {
      visitors: number;
    };
  }
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "shortValue",
    header: "Short value",
    cell: ({ row }) => <div>{row.getValue("shortValue")}</div>,
  },
  {
    accessorKey: "destination",
    header: "Destination",
    cell: ({ row }) => (
      <div className="max-w-[160px] truncate">
        {row.getValue("destination")}
      </div>
    ),
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => (
      <div className="">
        {row.getValue("password") ? (
          <LockIcon className="h-4 w-4" />
        ) : (
          "Unlocked"
        )}
      </div>
    ),
  },
  {
    accessorKey: "expiresAt",
    header: "Expires at",
    cell: ({ row }) => {
      return (
        <div className="max-w-[160px] truncate">
          {row.getValue("expiresAt")
            ? formatDateString(row.getValue("expiresAt"))
            : "Lifetime"}
        </div>
      );
    },
  },
  {
    accessorKey: "clicks",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clicks
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.original._count.visitors}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => (
      <div className="">{formatDateString(row.getValue("createdAt"))}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { onOpen } = useCreateLinkModal();
      const link = row.original;

      return (
        <Button
          variant="secondary"
          size="icon"
          onClick={() => {
            // @ts-ignore
            onOpen("linkDetailsSheet", { link });
          }}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      );
    },
  },
];
