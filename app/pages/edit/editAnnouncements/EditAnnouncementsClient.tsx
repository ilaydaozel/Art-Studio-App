'use client';
import { IAnnouncement } from '@/app/types';
import AddAnnouncementModal from '@/app/components/modal/AddAnnouncementModal';
import useAddAnnouncementModal from '@/app/hooks/useAddAnnouncementModal';
import AnnouncementsList from '@/app/components/lists/AnnouncementsList';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import translate from '@/app/components/translation/translate';

interface EditAnnouncementsClientProps {
  announcements: IAnnouncement[];
}

const t = (text: string): string => {
  return translate(text, { element: 'edit_announcements' });
};

const EditAnnouncementsClient = ({
  announcements,
}: EditAnnouncementsClientProps) => {
  const addAnnouncementModal = useAddAnnouncementModal();
  return (
    <>
      <AddAnnouncementModal />
      <ListWithButton
        buttonText={t('add_button_text')}
        onClick={() => addAnnouncementModal.onOpen()}
      >
        <ComponentWithHeading headingText={t('heading')}>
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
