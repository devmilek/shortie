import { create } from "zustand";

interface CreateLinkModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateLinkModal = create<CreateLinkModalProps>((set) => ({
  data: {},
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
