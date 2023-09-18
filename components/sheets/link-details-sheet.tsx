import { useModal } from "@/hooks/use-modal-store";
import React from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import LinkDetails from "../dashboard/link-details";

const LinkDetailsSheet = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { link } = data;
  const isModalOpen = isOpen && type === "linkDetailsSheet";
  return (
    <Sheet
      open={isModalOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <SheetContent className="px-0 border-border">
        <ScrollArea className="h-screen pb-10">
          <LinkDetails className="px-6 py-6" link={link} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default LinkDetailsSheet;
