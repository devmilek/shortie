"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateLinkModal } from "@/hooks/use-create-link-modal";
import { Link } from "@prisma/client";
import axios from "axios";
import {
  CopyIcon,
  Loader2,
  MoreVerticalIcon,
  PenIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface LinkCardDropdownProps {
  link: Link;
}

const LinkCardDropdown = ({ link }: LinkCardDropdownProps) => {
  const [isMounted, setIsMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onOpen, setData } = useCreateLinkModal();

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/link/${link.id}`);
      toast.success("Link deleted successfully");
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link.destination);
    toast.success("Copied to clipboard");
  };

  const handleEdit = () => {
    setData(link);
    onOpen();
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  if (isMounted) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button size="icon" variant="secondary" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <MoreVerticalIcon className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem disabled={isLoading} onClick={handleEdit}>
            <PenIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={isLoading} onClick={handleCopy}>
            <CopyIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <TrashIcon className="h-4 w-4 mr-2" />
            <span className="font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

export default LinkCardDropdown;
