import { LinkWithProfile } from "@/types";
import { Link } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createLinkModal"
  | "linkDetailsSheet"
  | "deleteLinkModal";

interface ModalData {
  link?:
    | LinkWithProfile
    | (LinkWithProfile & {
        _count: {
          visitors: string;
        };
      });
  longLink?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
