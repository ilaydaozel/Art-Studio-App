import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import VirtualExhibitionWithMenu from '@/app/components/virtualExhibition/VirtualExhibitionWithMenu';

interface IParams {
  exhibitionId?: string;
}

const VirtualExhibition = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null;

  try {
    exhibition = await getExhibitionById(params);
    if (exhibition?.exhibition) {
      return (
        <ClientOnly>
          <div className='relative'>
            <VirtualExhibitionWithMenu
              exhibition={exhibition.exhibition}
            ></VirtualExhibitionWithMenu>
          </div>
        </ClientOnly>
      );
    } else {
      return (
        <ClientOnly>
          <div className='bg-neutral-900'>
            <EmptyState item='virtualExhibition' />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default VirtualExhibition;
