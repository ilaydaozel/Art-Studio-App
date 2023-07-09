import { create } from 'zustand';

interface AddArtworkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddArtworkModal = create<AddArtworkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddArtworkModal;
