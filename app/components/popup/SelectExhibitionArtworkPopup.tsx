import { IArtwork } from '@/app/types';
import Popup from './Popup';
import styled from 'styled-components';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';

interface PopupProps {
  onClose: () => void;
  artworks?: IArtwork[];
}
const ArtworkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;
const ArtworksContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: 100%;
  margin: 2rem 1rem;
  grid-template-columns: repeat(10, 1fr);
  gap: 0.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
const ArtworkImage = styled.img`
  width: 10vw;
  height: 10vw;
  object-fit: cover;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
  }
`;
const ArtistName = styled.text`
  font-size: 0.8rem;
  font-weight: bold;
`;

const SearchInput = styled.input`
  width: 20%;
  padding: 6px;
  outline: 1px solid ${COLORS.darkGray};
`;

const SelectExhibitionArtworkPopup = ({
  onClose,
  artworks = [],
}: PopupProps) => {
  const [searchText, setSearchText] = useState('');

  const filteredArtworks = artworks.filter((artwork) =>
    `${artwork.artistName} ${artwork.artistSurname}`
      .toLocaleLowerCase('tr')
      .includes(searchText.toLowerCase())
  );

  let bodyContent = (
    <div className='w-[90%] flex flex-col justify-around items-end'>
      <SearchInput
        type='text'
        placeholder='Search by artist name'
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
      />
      <ArtworksContainer>
        {artworks ? (
          filteredArtworks.map((artwork) => (
            <ArtworkBox>
              <ArtworkImage
                key={artwork.id}
                src={artwork.artworkMedias[0] || ''}
              />
              <ArtistName>
                {artwork.artistName} {artwork.artistSurname}
              </ArtistName>
            </ArtworkBox>
          ))
        ) : (
          <p>There are no artworks!</p>
        )}
      </ArtworksContainer>
    </div>
  );

  return (
    <Popup
      onClose={onClose}
      width='100%'
      body={bodyContent}
      title={'Resim seç'}
      actionLabel={'Tamamla'}
      onSubmit={() => {}}
    ></Popup>
  );
};
export default SelectExhibitionArtworkPopup;
