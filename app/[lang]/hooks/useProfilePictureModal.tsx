import { create } from 'zustand';

interface ProfilePictureModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProfilePictureModal = create<ProfilePictureModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfilePictureModal;
