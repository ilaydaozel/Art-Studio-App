'use client';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import AnnouncementPreview from './AnnouncementPreview';
import HeadingWithUnderline from '@/app/[lang]/components/heading/HeadingWithUnderline';
import SlidingButton from '@/app/[lang]/components/buttons/SlidingButton';
import AddAnnouncementModal from '@/app/[lang]/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/[lang]/hooks/useAddAnnouncementModal';

interface AnnouncementsListProps {
  announcements: IAnnouncement[];
}

const AnnouncementsList = ({ announcements }: AnnouncementsListProps) => {
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

      <div className='w-[90%] py-8 flex flex-row flex-wrap items-center justify-around'>
        {announcements.map((announcement: IAnnouncement) => (
          <AnnouncementPreview
            key={announcement.id}
            announcement={announcement}
          ></AnnouncementPreview>
        ))}
      </div>
    </div>
  );
};
export default AnnouncementsList;
