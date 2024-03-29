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
      <div className='shadow-lg w-[66vw] h-[66vh] m-4'>
        <VirtualExhibitionWithMenu
          exhibition={exhibition}
          small={true}
        ></VirtualExhibitionWithMenu>
      </div>
    </ComponentWithHeading>
  );
};
export default VirtualExhibitionPreview;
