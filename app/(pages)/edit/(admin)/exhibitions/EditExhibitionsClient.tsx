import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ListWithButton from '@/app/components/layouts/ListWithButton';
import ExhibitionsList from '@/app/components/lists/ExhibitionsList';
import useTranslate from '@/app/hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { ROUTE_PATHS } from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface EditExhibitionsClientProps {
  exhibitions: IExhibition[];
}
const EditExhibitionsClient = ({ exhibitions }: EditExhibitionsClientProps) => {
  const router = useRouter();

  const location = { element: 'artist_accounts' };
  const t = useTranslate();
  return (
    <ListWithButton
      buttonText={t('add_button_text', location)}
      onClick={() =>
        router.push(`${ROUTE_PATHS.ADD}${ROUTE_PATHS.ADD_NEW_ARTIST}`)
      }
    >
      <ComponentWithHeading headingText='hello'>
        <ExhibitionsList exhibitions={exhibitions}></ExhibitionsList>
      </ComponentWithHeading>
    </ListWithButton>
  );
};
export default EditExhibitionsClient;
