import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import ExhibitionProfile from '@/app/components/exhibition/ExhibitionProfile';
import StartMenu from '@/app/components/virtualExhibition/VirtualExhibitionWithMenu';

interface IParams {
  exhibitionId?: string;
}

const ExhibitionPage = async ({ params }: { params: IParams }) => {
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
      <StartMenu artworks={exhibition.exhibition.artworks}></StartMenu>
    </ClientOnly>
  );
};

export default ExhibitionPage;