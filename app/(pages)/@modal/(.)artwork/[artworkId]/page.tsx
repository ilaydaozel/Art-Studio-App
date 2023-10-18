import getArtworkById from '@/app/actions/artwork/getArtworkById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IArtwork } from '@/app/types';
import Modal from '@/app/components/modal/InterceptionModal';
import Image from 'next/image';

interface IParams {
  artworkId?: string;
}

const ArtworkModal = async ({ params }: { params: IParams }) => {
  let artwork: { artwork: IArtwork } | null;
  try {
    artwork = await getArtworkById(params);
    if (artwork?.artwork) {
      return (
        <ClientOnly>
          <Modal>
            <Image
              alt=''
              src={artwork.artwork.artworkMedias[0]}
              height={200}
              width={200}
              className='w-full object-cover aspect-square'
            />
          </Modal>
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
export default ArtworkModal;
