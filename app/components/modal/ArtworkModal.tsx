'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import Modal from './Modal';
import useArtworkModal from '@/app/hooks/useArtworkModal';
import { UserArtwork } from '@prisma/client';
import Image from 'next/image';
interface ArtworkModalProps {
  artwork: UserArtwork | null;
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
