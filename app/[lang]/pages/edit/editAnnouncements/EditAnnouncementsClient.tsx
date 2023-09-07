'use client';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import AddAnnouncementModal from '@/app/[lang]/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/[lang]/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/[lang]/components/lists/AnnouncementsList';
import ListWithHeading from '@/app/[lang]/components/pageLayout/ListWithHeading';
import ListWithButton from '@/app/[lang]/components/pageLayout/ListWithButton';

interface EditAnnouncementsClientProps {
  announcements: IAnnouncement[];
}

const EditAnnouncementsClient = ({
  announcements,
}: EditAnnouncementsClientProps) => {
  const addAnnouncementModal = useAddAnnouncementModal();
  return (
    <>
      <AddAnnouncementModal />
      <ListWithButton
        buttonText='Yeni Duyuru Ekle +'
        onClick={() => addAnnouncementModal.onOpen()}
      >
        <ListWithHeading headingText='Duyuruları Düzenle'>
          <AnnouncementsList
            isEditable
            announcements={announcements}
          ></AnnouncementsList>
        </ListWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditAnnouncementsClient;
