'use client';

import ComponentWithHeading from '@/app/components/layouts/ComponentWithHeading';
import ExhibitionsList from '@/app/components/lists/ExhibitionsList';
import useTranslate from '@/app/hooks/useTranslate';
import { IExhibition } from '@/app/types';

interface ExhibitionsClientProps {
  exhibitions: IExhibition[];
}

const ExhibitionsClient = ({ exhibitions }: ExhibitionsClientProps) => {
  const location = { element: 'exhibitions' };
  const t = useTranslate();

  return (
    <ComponentWithHeading headingText={t('list_heading', location)}>
      <ExhibitionsList exhibitions={exhibitions}></ExhibitionsList>
    </ComponentWithHeading>
  );
};
export default ExhibitionsClient;
