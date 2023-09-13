import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ExhibitionsList from '@/app/components/lists/ExhibitionsList';
import { IExhibition } from '@/app/types';

interface ExhibitionsClientProps {
  exhibitions: IExhibition[];
}
const ExhibitionsClient = ({ exhibitions }: ExhibitionsClientProps) => {
  return (
    <ComponentWithHeading headingText='hello'>
      <ExhibitionsList exhibitions={exhibitions}></ExhibitionsList>
    </ComponentWithHeading>
  );
};
export default ExhibitionsClient;
