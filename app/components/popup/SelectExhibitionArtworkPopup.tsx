import { IArtwork, IExhibition } from '@/app/types';
import Popup from './Popup';
import styled from 'styled-components';
import { useState } from 'react';
import { COLORS } from '@/constants/colors';
import { AiFillMinusCircle, AiFillCheckCircle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface PopupProps {
  onClose: () => void;
  artworks?: IArtwork[];
  exhibition: IExhibition;
}
const SelectedArtworksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  gap: 0.5rem;
  margin: 0.5rem;
  padding: 0.5rem;
  box-shadow: 6px 6px 3px rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  border: 2px solid #f5f5f5;
`;

const ArtworksContainer = styled.div`
  display: grid;
  grid-auto-rows: max-content;
  align-items: start;
  justify-items: center;
  width: 100%;
  grid-template-columns: repeat(8, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: repeat(4, 1fr);
  }
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
const ArtistName = styled.text`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
`;

const SearchInput = styled.input`
  width: 20%;
  padding: 6px;
  outline: 1px solid ${COLORS.darkGray};
`;

const Heading = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
`;
const EmptyText = styled.p`
  font-size: 1.5rem;
  text-align: center;
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/exhibition/addArtworksToExhibition/${exhibition.id}`,
        {
          selectedArtworks,
        }
      );

      if (response.data.error) {
        console.error('error: ', response.data.error);
        toast.error(response.data.error);
      } else {
        toast.success('Eserler sergiye eklendi!');
        router.refresh();
      }
    } catch (error) {
      // Handle other errors here
      console.error('Error:', error);
      toast.error('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent =
    artworks.length !== 0 ? (
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
          {filteredArtworks.map((artwork) => (
            <ArtworkBox key={artwork.id}>
              {selectedArtworks.includes(artwork) && (
                <AiFillCheckCircle className='absolute right-0 top-0 text-green-600' />
              )}
              <ArtworkImage
                src={artwork.artworkMedias[0] || ''}
                onClick={() => toggleArtworkSelection(artwork)}
              />
              <ArtistName>
                {artwork.artistName} {artwork.artistSurname}
              </ArtistName>
            </ArtworkBox>
          ))}
        </ArtworksContainer>
        <SelectedArtworksWrapper>
          <Heading>Sergiye Eklenecek Resimler</Heading>
          <ArtworksContainer>
            {selectedArtworks.map((artwork) => (
              <ArtworkBox
                key={artwork.id}
                onClick={() => {
                  setSelectedArtworks(
                    selectedArtworks.filter((a) => a.id !== artwork.id)
                  );
                }}
              >
                <AiFillMinusCircle className='absolute right-0 top-0 text-red-600' />
                <ArtworkImage src={artwork.artworkMedias[0] || ''} />
                <ArtistName>
                  {artwork.artistName} {artwork.artistSurname}
                </ArtistName>
              </ArtworkBox>
            ))}
          </ArtworksContainer>
        </SelectedArtworksWrapper>
      </div>
    ) : (
      <div>
        <EmptyText>There are no artworks!</EmptyText>
        <EmptyText>All the artworks are chosen.</EmptyText>
      </div>
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
