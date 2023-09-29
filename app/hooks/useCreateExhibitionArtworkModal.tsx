import { create } from 'zustand';

interface CreateExhibitionArtworkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateExhibitionArtworkModal =
  create<CreateExhibitionArtworkModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export default useCreateExhibitionArtworkModal;
