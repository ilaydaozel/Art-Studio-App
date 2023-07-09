'use client';
import { UserArtwork } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface ArtworkContainerProps {
  artwork?: UserArtwork | null;
  label: string;
}

const Container = styled.div`
  padding: 4px;
  width: 300px;
  height: 60vh;
  background-color: #fff;
  margin: 30px 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
`;
const ArtworkContainer = ({ artwork, label }: ArtworkContainerProps) => {
  return (
    <Container>
      <div className='w-[40vw]'>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          src={artwork?.artworkMedias[0] || ''}
          alt={'profile Image'}
        />
      </div>
    </Container>
  );
};

export default ArtworkContainer;
