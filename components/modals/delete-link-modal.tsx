"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { Icons } from "../icons";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

const DeleteLinkModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose, type, data } = useModal();
  const { link } = data;
  const isModalOpen = isOpen && type === "deleteLinkModal";
  const router = useRouter();

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const deletedLink = await axios.delete(
        "/api/link/" + data.link?.shortValue
      );
      router.refresh();
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog
      open={isModalOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your link
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" disabled={isLoading} onClick={onDelete}>
            {isLoading ? (
              <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Trash className="w-4 h-4 mr-2" />
            )}{" "}
            Delete Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLinkModal;
