'use client';
import { IAnnouncement } from '@/app/[lang]/types';
import AddAnnouncementModal from '@/app/[lang]/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/[lang]/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/[lang]/components/lists/AnnouncementsList';
import ComponentWithHeading from '@/app/[lang]/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/[lang]/components/layouts/ListWithButton';

interface EditAnnouncementsClientProps {
  announcements: IAnnouncement[];
  messages: any;
}

const EditAnnouncementsClient = ({
  announcements,
  messages,
}: EditAnnouncementsClientProps) => {
  const addAnnouncementModal = useAddAnnouncementModal();
  return (
    <>
      <AddAnnouncementModal />
      <ListWithButton
        buttonText={messages.add_button_text}
        onClick={() => addAnnouncementModal.onOpen()}
      >
        <ComponentWithHeading headingText={messages.heading}>
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
