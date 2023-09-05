import { create } from 'zustand';

interface ArtworkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useArtworkModal = create<ArtworkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useArtworkModal;
