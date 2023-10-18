import Image from 'next/image';
import { IArtwork } from '@/app/types';
import getArtworkById from '@/app/actions/artwork/getArtworkById';
import EmptyState from '@/app/components/EmptyState';
import ClientOnly from '@/app/components/ClientOnly';

interface IParams {
  artworkId?: string;
}

const Artwork = async ({ params }: { params: IParams }) => {
  let artwork: { artwork: IArtwork } | null = null;
  try {
    artwork = await getArtworkById(params);
    if (artwork?.artwork) {
      return (
        <ClientOnly>
          <div className='pt-28 pb-8 flex justify-center'>
            <Image
              alt=''
              src={artwork.artwork.artworkMedias[0]}
              height={500}
              width={500}
            />
          </div>
        </ClientOnly>
      );
    } else {
      return (
        <ClientOnly>
          <div className='bg-neutral-900'>
            <EmptyState item='artwork' />
          </div>
        </ClientOnly>
      );
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
export default Artwork;
