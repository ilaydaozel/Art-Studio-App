import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IArtistProfile, IArtwork, IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import ExhibitionProfile from '@/app/components/exhibition/ExhibitionProfile';
import getAllArtworks from '@/app/actions/artwork/getAllArtworks';
import getAllArtistProfiles from '@/app/actions/artistProfile/getAllArtistProfiles';

interface IParams {
  exhibitionId?: string;
}

const ExhibitionPage = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null = null;
  let allArtworks: { artworks: IArtwork[] } | null = null;
  let allArtistProfiles: { artistProfiles: IArtistProfile[] } | null = null;

  if (params != undefined && params != undefined) {
    exhibition = await getExhibitionById(params);
    allArtworks = await getAllArtworks();
    allArtistProfiles = await getAllArtistProfiles();
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
        isEditable={true}
        artworks={allArtworks?.artworks}
        exhibition={exhibition.exhibition}
        allArtistProfiles={allArtistProfiles?.artistProfiles}
      ></ExhibitionProfile>
    </ClientOnly>
  );
};

export default ExhibitionPage;
