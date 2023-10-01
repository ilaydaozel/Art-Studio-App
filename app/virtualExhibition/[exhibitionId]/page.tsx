import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import VirtualExhibitionWithMenu from '@/app/components/virtualExhibition/VirtualExhibitionWithMenu';

interface IParams {
  exhibitionId?: string;
}

const VirtualExhibition = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null = null;

  if (params != undefined && params != undefined) {
    exhibition = await getExhibitionById(params);
  }

  if (!exhibition) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like this exhibiton does not exist anymore.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <div className='relative'>
        <VirtualExhibitionWithMenu
          exhibition={exhibition.exhibition}
        ></VirtualExhibitionWithMenu>
      </div>
    </ClientOnly>
  );
};

export default VirtualExhibition;
