import { IArtwork, IExhibition } from '@/app/types';
import Popup from './Popup';
import styled from 'styled-components';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';
import {
  AiFillCheckCircle,
  AiOutlineSearch,
  AiFillMinusCircle,
} from 'react-icons/ai';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { handleApiResponse } from '../utils/Helper';
import useTranslate from '@/app/hooks/useTranslate';
import EmptyState from '../EmptyState';
interface PopupProps {
  onClose: () => void;
  artworks?: IArtwork[];
  exhibition: IExhibition;
}
const SelectedArtworksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 150px;
  gap: 0.5rem;
  border-top: 1px solid ${COLORS.lightGray};
  overflow: auto;
  padding: 1rem 1rem 0 1rem;
`;

const ArtworksContainer = styled.div<{ minWidth: string }>`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: 100%;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${(props) => props.minWidth}, 1fr)
  );
  gap: 1rem;
`;

const ArtworkBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 0.6rem 0 0.6rem;
  &:hover {
    transform: translateY(-0.4rem);
  }
  transition: transform 0.5s;
`;

const ArtworkImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
`;

const ArtworkImageMini = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
`;

const ArtistName = styled.text`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
`;

const SearchInput = styled.input`
  width: 20%;
  padding: 2px;
  outline: 1px solid ${COLORS.lightGray};
  border-radius: 0.5rem;
  @media (max-width: 992px) {
    width: 30%;
  }
  @media (max-width: 768px) {
    width: 40%;
  }
`;

const Heading = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
`;

const SelectExhibitionArtworkPopup = ({
  onClose,
  artworks = [],
  exhibition,
}: PopupProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedArtworks, setSelectedArtworks] = useState([] as IArtwork[]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslate();
  const location = { element: 'exhibition_profile' };

  const filteredArtworks = artworks.filter((artwork) =>
    `${artwork.artistName} ${artwork.artistSurname}`
      .toLocaleLowerCase('tr')
      .includes(searchText.toLowerCase())
  );

  const toggleArtworkSelection = (artwork: IArtwork) => {
    if (selectedArtworks.includes(artwork)) {
      setSelectedArtworks(selectedArtworks.filter((a) => a.id !== artwork.id));
    } else {
      setSelectedArtworks([...selectedArtworks, artwork]);
    }
  };

  const onSubmit = async () => {
    await handleApiResponse(
      axios.post(`/api/exhibition/addArtworksToExhibition/${exhibition.id}`, {
        selectedArtworks,
      }),
      setIsLoading,
      t,
      router,
      t('add_artwork_to_exhibition_successful_message', location)
    );
  };

  let bodyContent =
    artworks.length !== 0 ? (
      <div className='w-full h-[80%] flex flex-col justify-between items-center'>
        <div className='flex gap-1 w-full items-center justify-end mr-5'>
          <AiOutlineSearch />
          <SearchInput
            type='text'
            placeholder='Search by artist name'
            value={searchText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
          />
        </div>

        <div className='w-[96%] max-h-[80vh] p-2 overflow-y-auto'>
          <ArtworksContainer minWidth='120px'>
            {filteredArtworks.map((artwork) => (
              <ArtworkBox key={artwork.id}>
                {selectedArtworks.includes(artwork) && (
                  <AiFillCheckCircle className='absolute right-0 top-0 text-green-600' />
                )}
                <ArtworkImage
                  src={artwork.artworkMedias[0] || '/images/blurImage.jpg'}
                  onClick={() => toggleArtworkSelection(artwork)}
                />
                <ArtistName>
                  {artwork.artistName} {artwork.artistSurname}
                </ArtistName>
              </ArtworkBox>
            ))}
          </ArtworksContainer>
        </div>
        <SelectedArtworksWrapper>
          <Heading>Sergiye Eklenecek Resimler</Heading>
          <ArtworksContainer minWidth='80px'>
            {selectedArtworks.map((artwork) => (
              <ArtworkBox
                key={artwork.id}
                onClick={() => {
                  setSelectedArtworks(
                    selectedArtworks.filter((a) => a.id !== artwork.id)
                  );
                }}
              >
                <ArtworkImageMini
                  className='peer'
                  src={artwork.artworkMedias[0] || '/images/blurImage.jpg'}
                />
                <AiFillMinusCircle className='peer-hover:visible invisible absolute right-0 top-0 text-red-600' />
              </ArtworkBox>
            ))}
          </ArtworksContainer>
        </SelectedArtworksWrapper>
      </div>
    ) : (
      <EmptyState item='artworks'></EmptyState>
    );

  return (
    <Popup
      onClose={onClose}
      width='100%'
      body={bodyContent}
      title={'Resim seç'}
      actionLabel={'Tamamla'}
      onSubmit={onSubmit}
    ></Popup>
  );
};
export default SelectExhibitionArtworkPopup;
