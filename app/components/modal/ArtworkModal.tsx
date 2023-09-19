'use client';
import { useState } from 'react';

import Modal from './Modal';
import useArtworkModal from '@/app/hooks/useArtworkModal';
import Image from 'next/image';
import { IArtwork } from '@/app/types';
interface ArtworkModalProps {
  artwork: IArtwork | null;
  onClose: () => void;
}

const DisplayArtworkModal = ({ artwork, onClose }: ArtworkModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const artworkModal = useArtworkModal();

  const onSubmit = () => {};
  const bodyContent = (
    <div>
      <Image
        width={0}
        height={0}
        sizes='100vw'
        style={{ width: '100%', height: 'auto' }}
        src={artwork?.artworkMedias[0] || ''}
        alt={'profile Image'}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={artworkModal.isOpen}
      title='Eser'
      actionLabel='Kaydol'
      onClose={onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default DisplayArtworkModal;
