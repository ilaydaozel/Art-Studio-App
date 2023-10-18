import ClientOnly from '@/app/components/ClientOnly';
import { IArtistProfile, IArtwork, IExhibition } from '@/app/types';
import getExhibitionById from '@/app/actions/exhibition/getExhibitionById';
import ExhibitionProfile from '@/app/components/exhibition/ExhibitionProfile';
import getAllArtworks from '@/app/actions/artwork/getAllArtworks';
import getAllArtistProfiles from '@/app/actions/artistProfile/getAllArtistProfiles';
import EmptyState from '@/app/components/EmptyState';

interface IParams {
  exhibitionId?: string;
}

const ExhibitionPage = async ({ params }: { params: IParams }) => {
  let exhibition: { exhibition: IExhibition } | null;
  let allArtworks: { artworks: IArtwork[] };
  let allArtistProfiles: { artistProfiles: IArtistProfile[] };
  try {
    exhibition = await getExhibitionById(params);
    allArtworks = await getAllArtworks();
    allArtistProfiles = await getAllArtistProfiles();

    if (exhibition?.exhibition) {
      return (
        <ClientOnly>
          <ExhibitionProfile
            artworks={allArtworks.artworks}
            exhibition={exhibition.exhibition}
            allArtistProfiles={allArtistProfiles.artistProfiles}
          ></ExhibitionProfile>
        </ClientOnly>
      );
    } else {
      return (
        <ClientOnly>
          <div className='bg-neutral-900'>
            <EmptyState item='exhibition' />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export default ExhibitionPage;
