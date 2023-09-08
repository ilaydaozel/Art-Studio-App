import { create } from 'zustand';

interface BiographyModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBiographyModal = create<BiographyModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useBiographyModal;
