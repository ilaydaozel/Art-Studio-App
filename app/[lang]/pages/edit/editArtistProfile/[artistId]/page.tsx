import getArtistProfileById from '@/app/[lang]/actions/getArtistProfileById';
import ClientOnly from '@/app/[lang]/components/ClientOnly';
import ArtistProfile from '@/app/[lang]/components/artistProfile/ArtistProfile';
import EmptyState from '@/app/[lang]/components/EmptyState';
import getAllArtworksByArtistId from '@/app/[lang]/actions/getAllArtworksByArtistId';
import { IArtistProfile, IUserArtwork } from '@/app/[lang]/types';
import { IPageProps } from '@/app/[lang]/types/page';
import { getDictionary } from '@/lib/dictionary';

interface IParams extends IPageProps {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  const { editArtistAccountsPage } = await getDictionary(params.lang);
  let artistProfile: { artistProfile: IArtistProfile } | null = null;
  let allArtworks: { allUserArtworks: IUserArtwork[] } | null = null;
  if (params != undefined && params != undefined) {
    artistProfile = await getArtistProfileById(params);
    allArtworks = await getAllArtworksByArtistId(params);
  }

  if (!artistProfile?.artistProfile) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like this artist does not exist anymore.'
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ArtistProfile
        artistProfile={artistProfile.artistProfile}
        artworks={allArtworks?.allUserArtworks}
        isEditable
        messages
      />
    </ClientOnly>
  );
};

export default ArtistProfilePage;
