'use client';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import SlidingButton from '@/app/[lang]/components/buttons/SlidingButton';
import AddAnnouncementModal from '@/app/[lang]/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/[lang]/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/[lang]/components/lists/AnnouncementsList';

interface EditAnnouncementsClientProps {
  announcements: IAnnouncement[];
}

const EditAnnouncementsClient = ({
  announcements,
}: EditAnnouncementsClientProps) => {
  const addAnnouncementModal = useAddAnnouncementModal();
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div className='flex w-[80%] justify-end'>
        <AddAnnouncementModal />
        <SlidingButton
          label='Yeni Duyuru Ekle +'
          onClick={() => addAnnouncementModal.onOpen()}
        ></SlidingButton>
      </div>
      <HeadingWithUnderline title='Duyuruları Düzenle'></HeadingWithUnderline>
      <AnnouncementsList
        isEditable
        announcements={announcements}
      ></AnnouncementsList>
    </div>
  );
};
export default EditAnnouncementsClient;
