import { create } from 'zustand';

interface AddAnnouncementModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddAnnouncementModal = create<AddAnnouncementModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddAnnouncementModal;
