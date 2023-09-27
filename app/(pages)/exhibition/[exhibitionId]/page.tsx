import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IArtwork, IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import ExhibitionProfile from '@/app/components/exhibition/ExhibitionProfile';
import { PiArrowSquareInThin } from 'react-icons/pi';
import getAllArtworks from '@/app/actions/artwork/getAllArtworks';

interface IParams {
  exhibitionId?: string;
}

const ExhibitionPage = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null = null;
  let artworks: { artworks: IArtwork[] } | null = null;

  if (params != undefined && params != undefined) {
    exhibition = await getExhibitionById(params);
    artworks = await getAllArtworks();
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
      <ExhibitionProfile
        artworks={artworks?.artworks}
        exhibition={exhibition.exhibition}
      ></ExhibitionProfile>
    </ClientOnly>
  );
};

export default ExhibitionPage;
