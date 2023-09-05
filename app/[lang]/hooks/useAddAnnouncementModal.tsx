import { create } from 'zustand';

interface AddAnnouncementModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddArtworkModal = create<AddAnnouncementModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddArtworkModal;
