import { LinkWithProfile } from "@/types";
import { Link } from "@prisma/client";
import { create } from "zustand";

type Store = {
  link: LinkWithProfile | null;
  setLink: (link: LinkWithProfile | null) => void;
};

export const useLastCreatedLink = create<Store>()((set) => ({
  link: null,
  setLink: (link) => set(() => ({ link: link })),
}));
