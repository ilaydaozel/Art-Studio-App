import { create } from 'zustand';

interface CreateAnnouncementModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateAnnouncementModal = create<CreateAnnouncementModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);

export default useCreateAnnouncementModal;
