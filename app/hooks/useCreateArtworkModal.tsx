import { create } from 'zustand';

interface CreateArtworkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateArtworkModal = create<CreateArtworkModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateArtworkModal;
