import { Link } from "@prisma/client";
import { create } from "zustand";

interface CreateLinkModalProps {
  isOpen: boolean;
  data: Link | null;
  onOpen: () => void;
  onClose: () => void;
  setData: (data: Link) => void;
}

export const useCreateLinkModal = create<CreateLinkModalProps>((set) => ({
  data: null,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, data: null }),
  setData: (data) => set({ data }),
}));
