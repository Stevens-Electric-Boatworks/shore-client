import { create } from "zustand";

export type ModalType = "settings" | "confirmUserDeactivation";

type ModalStore = {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: unknown) => void;
  onClose: () => void;
  data: unknown;
};

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type, data = null) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => {
    set({ isOpen: false, type: null, data: null });
  },
  data: null,
}));
