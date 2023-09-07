'use client';
import { IAnnouncement } from '@/app/[lang]/actions/type';
import AddAnnouncementModal from '@/app/[lang]/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/[lang]/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/[lang]/components/lists/AnnouncementsList';
import ComponentWithHeading from '@/app/[lang]/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/[lang]/components/layouts/ListWithButton';

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
        <ComponentWithHeading headingText='Duyuruları Düzenle'>
          <AnnouncementsList
            isEditable
            announcements={announcements}
          ></AnnouncementsList>
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditAnnouncementsClient;
