import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import getArtistProfileById from '@/app/actions/artistProfile/getArtistProfileById';
import ArtistProfile from '@/app/components/artistProfile/ArtistProfile';
import getAllArtworksByArtistId from '@/app/actions/artwork/getAllArtworksByArtistId';
import { IArtistProfile, IArtwork } from '@/app/types';
import Link from 'next/link';
import Artwork from '@/app/components/artwork/Artwork';

interface IParams {
  artistId?: string;
}

const ArtistProfilePage = async ({ params }: { params: IParams }) => {
  let artistProfile: { artistProfile: IArtistProfile } | null = null;
  try {
    artistProfile = await getArtistProfileById(params);
    if (artistProfile?.artistProfile) {
      return (
        <ClientOnly>
          <ArtistProfile artistProfile={artistProfile.artistProfile} />
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
