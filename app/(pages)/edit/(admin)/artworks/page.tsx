import { IArtwork } from '@/app/types';
import getAllArtworks from '@/app/actions/artwork/getAllArtworks';
import EditArtworksClient from './EditArtworksClient';
import ClientOnly from '@/app/components/ClientOnly';

const ArtworksPage = async () => {
  let artworks: IArtwork[];
  try {
    const response = await getAllArtworks();
    if (response.artworks) {
      artworks = response.artworks;
      return (
        <ClientOnly>
          <div className='pt-28 w-full'>
            <EditArtworksClient artworks={artworks} />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    console.error('Error:', error);
    throw new Error(error);
  }
};

export default ArtworksPage;
