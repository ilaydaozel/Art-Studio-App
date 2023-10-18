import getArtistProfileById from '@/app/actions/artistProfile/getArtistProfileById';
import ArtistProfile from '@/app/components/artistProfile/ArtistProfile';
import { IArtistProfile } from '@/app/types';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  let artistProfile: { artistProfile: IArtistProfile } | null;
  try {
    artistProfile = await getArtistProfileById(params);
    if (artistProfile?.artistProfile) {
      return (
        <ClientOnly>
          <ArtistProfile
            artistProfile={artistProfile.artistProfile}
            isEditable={true}
          />
        </ClientOnly>
      );
    } else {
      return (
        <ClientOnly>
          <div className='bg-neutral-900'>
            <EmptyState item='artistAccount' />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ArtistProfilePage;
