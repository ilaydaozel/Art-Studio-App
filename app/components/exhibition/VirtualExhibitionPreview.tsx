'use client';

import { IExhibition } from '@/app/types';
import VirtualExhibitionWithMenu from '../virtualExhibition/VirtualExhibitionWithMenu';
import ComponentWithHeading from '../layouts/ComponentWithHeading';

interface VirtualExhibitionPreviewProps {
  exhibition: IExhibition;
}

const VirtualExhibitionPreview = ({
  exhibition,
}: VirtualExhibitionPreviewProps) => {
  return (
    <ComponentWithHeading headingText='Sanal Sergi'>
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
