import { create } from 'zustand';

interface UpdateTextModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUpdateTextModal = create<UpdateTextModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUpdateTextModal;
