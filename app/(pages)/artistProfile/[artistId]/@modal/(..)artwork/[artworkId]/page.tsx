import Image from 'next/image';
import { IArtwork } from '@/app/types';
import getArtworkById from '@/app/actions/getArtworkById';
import ClientOnly from '@/app/components/ClientOnly';
import EmptyState from '@/app/components/EmptyState';
import NextModal from '@/app/components/modal/NextModal';

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
    <NextModal>
      <Image
        alt=''
        src={artwork.artwork.artworkMedias[0]}
        height={500}
        width={500}
        className='w-full object-cover aspect-square'
      />
    </NextModal>
  );
};
export default ArtworkModal;
