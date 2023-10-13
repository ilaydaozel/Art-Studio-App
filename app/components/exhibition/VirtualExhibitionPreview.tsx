'use client';

import { IExhibition } from '@/app/types';
import VirtualExhibitionWithMenu from '../virtualExhibition/VirtualExhibitionWithMenu';
import ComponentWithHeading from '../layouts/ComponentWithHeading';
import useTranslate from '@/app/hooks/useTranslate';

interface VirtualExhibitionPreviewProps {
  exhibition: IExhibition;
}

const VirtualExhibitionPreview = ({
  exhibition,
}: VirtualExhibitionPreviewProps) => {
  const t = useTranslate();
  const location = {
    element: 'virtual_exhibition',
    superElement: 'exhibition_profile',
  };
  return (
    <ComponentWithHeading headingText={t('heading', location)}>
      <div className='m-8 shadow-lg'>
        <VirtualExhibitionWithMenu
          exhibition={exhibition}
          small={true}
        ></VirtualExhibitionWithMenu>
      </div>
    </ComponentWithHeading>
  );
};
export default VirtualExhibitionPreview;
