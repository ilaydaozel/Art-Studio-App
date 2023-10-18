import { IArtistProfile, IArtwork } from '@/app/types';
import getAllArtworks from '@/app/actions/artwork/getAllArtworks';
import EditArtworksClient from './EditArtworksClient';
import ClientOnly from '@/app/components/ClientOnly';
import getAllArtistProfiles from '@/app/actions/artistProfile/getAllArtistProfiles';

const ArtworksPage = async () => {
  let artworks: IArtwork[];
  let allArtistProfiles: { artistProfiles: IArtistProfile[] };
  try {
    const response = await getAllArtworks();
    allArtistProfiles = await getAllArtistProfiles();
    if (response.artworks) {
      artworks = response.artworks;
      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <EditArtworksClient
              artworks={artworks}
              artistProfiles={allArtistProfiles.artistProfiles}
            />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default ArtworksPage;
