'use client';

import EmptyState from '@/app/components/EmptyState';
import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import ExhibitionsList from '@/app/components/lists/ExhibitionsList';
import CreateExhibitionModal from '@/app/components/modal/CreateExhibitionModal';
import useCreateExhibitionModal from '@/app/hooks/useCreateExhibitionModal';
import useTranslate from '@/app/hooks/useTranslate';
import { IExhibition } from '@/app/types';

interface EditExhibitionsClientProps {
  exhibitions: IExhibition[];
}
const EditExhibitionsClient = ({ exhibitions }: EditExhibitionsClientProps) => {
  const createExhibitionModal = useCreateExhibitionModal();

  const location = { element: 'exhibitions' };
  const t = useTranslate();
  return (
    <>
      <CreateExhibitionModal />
      <ListWithButton
        buttonText={t('add_button_text', location)}
        onClick={() => createExhibitionModal.onOpen()}
      >
        <ComponentWithHeading headingText={t('list_heading', location)}>
          {exhibitions.length > 0 ? (
            <ExhibitionsList
              width='90%'
              exhibitions={exhibitions}
              isEditable={true}
            ></ExhibitionsList>
          ) : (
            <EmptyState item='exhibitions'></EmptyState>
          )}
        </ComponentWithHeading>
      </ListWithButton>
    </>
  );
};
export default EditExhibitionsClient;
