'use client';
import { IAnnouncement } from '@/app/types';
import CreateAnnouncementModal from '@/app/components/modal/CreateAnnouncementModal';
import useCreateAnnouncementModal from '@/app/hooks/useCreateAnnouncementModal';
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
  const createAnnouncementModal = useCreateAnnouncementModal();

  const location = { element: 'edit_announcements' };
  const t = useTranslate();

  return (
    <>
      <CreateAnnouncementModal />
      <ListWithButton
        buttonText={t('add_button_text', location)}
        onClick={() => createAnnouncementModal.onOpen()}
      >
        <ComponentWithHeading headingText={t('heading', location)}>
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
