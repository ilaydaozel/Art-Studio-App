'use client';
import { UserArtwork } from '@prisma/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import qs from 'query-string';
import styled from 'styled-components';

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
  return <Container>This is an artwork {label}</Container>;
};

export default ArtworkContainer;
