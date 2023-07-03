'use client';
import { UserArtwork } from '@prisma/client';
import styled from 'styled-components';
import ArtworkContainer from './ArtworkContainer';

interface ArtworkListProps {
  artworkArray?: UserArtwork[] | null;
  title: string;
}

const Container = styled.div`
  padding: 10px;
`;

const ListTitle = styled.h1`
  font-size: 28px;
  padding: 4px;
  text-align: center;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  flex-wrap: wrap;
`;
const ArtworkList = ({ artworkArray = [], title }: ArtworkListProps) => {
  return (
    <Container>
      <ListTitle>{title}</ListTitle>
      <ListContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
        <ArtworkContainer label='ilayda'></ArtworkContainer>
      </ListContainer>
    </Container>
  );
};

export default ArtworkList;
