'use client';
import { UserArtwork } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ArtworkContainerProps {
  artwork?: UserArtwork | null;
}

const Container = styled.div`
  padding: 4px;
  width: 300px;
  background-color: #fff;
  margin: 30px 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;
const ArtworkContainer = ({ artwork }: ArtworkContainerProps) => {
  return (
    <Container>
      <Image
        width={300}
        height={0}
        src={artwork?.artworkMedias[0] || ''}
        alt={'artwork image'}
      />
      <h1>Başlık: {artwork?.title || ''}</h1>
    </Container>
  );
};

export default ArtworkContainer;
