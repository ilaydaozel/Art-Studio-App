import getArtworkById from '@/app/actions/artwork/getArtworkById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import { IArtwork } from '@/app/types';
import Modal from '../../../Modal';
import Image from 'next/image';

interface IParams {
  artworkId?: string;
}

const ArtworkModal = async ({ params }: { params: IParams }) => {
  let artwork: { artwork: IArtwork } | null = null;
  if (params != undefined && params != undefined) {
    artwork = await getArtworkById(params);
  }
  if (!artwork) {
    return (
      <ClientOnly>
        <EmptyState
          title='An error occured.'
          subtitle='Looks like this artwork does not exist anymore.'
        />
      </ClientOnly>
    );
  }

  return (
    <Modal>
      <Image
        alt=''
        src={artwork.artwork.artworkMedias[0]}
        height={200}
        width={200}
        className='w-full object-cover aspect-square'
      />
    </Modal>
  );
};
export default ArtworkModal;
