'use client';
import { IAnnouncement } from '@/app/types';
import AddAnnouncementModal from '@/app/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/components/lists/AnnouncementsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import useTranslate from '@/app/hooks/useTranslate';

interface EditAnnouncementsClientProps {
  announcements: IAnnouncement[];
}

const EditAnnouncementsClient = ({
  announcements,
}: EditAnnouncementsClientProps) => {
  const addAnnouncementModal = useAddAnnouncementModal();
  const useT = (text: string): string => {
    return useTranslate(text, { element: 'edit_announcements' });
  };

  return (
    <>
      <AddAnnouncementModal />
      <ListWithButton
        buttonText={useT('add_button_text')}
        onClick={() => addAnnouncementModal.onOpen()}
      >
        <ComponentWithHeading headingText={useT('heading')}>
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
