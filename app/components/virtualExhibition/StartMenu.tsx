import styled from 'styled-components';
import ThreeDExhibition from './ThreeDExhibition';
import { IUserArtwork } from '@/app/actions/type';
import Image from 'next/image';
import { COLORS } from '@/constants/colors';
import { useEffect, useState } from 'react';

interface GalleryProps {
  artworks?: IUserArtwork[];
}

const MenuContainer = styled.div`
  position: fixed;
  width: 50vw;
  height: 60vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const StartButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.25rem 1rem;
  margin: 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.5s;
  background-color: ${COLORS.darkGray};
  color: white;
  &:hover {
    transform: scale(1.05);
  }
`;
const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  gap: 5px;
`;

const ExhibitionTitle = styled.text`
  font-size: 1.5rem;
  color: ${COLORS.darkGray};
  font-weight: bold;
`;
const InfoText = styled.text`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const StartMenu = ({ artworks = [] }: GalleryProps) => {
  const [showMenu, setShowMenu] = useState(true);

  const handleStartClick = () => {
    setShowMenu(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setShowMenu(true);
    }
    if (event.key === 'Enter' || event.key === 'Return') {
      setShowMenu(false);
    }
    if (event.key === ' ') {
      setShowMenu(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      {showMenu && (
        <MenuContainer>
          <div className='relative w-full h-[40%]'>
            <Image
              style={{
                borderTopRightRadius: '0.5rem',
                borderTopLeftRadius: '0.5rem',
              }}
              src={
                'https://res.cloudinary.com/dnlz4muyb/image/upload/v1691094915/j0dfdld8wjk1cdgb8afs.jpg'
              }
              placeholder='empty'
              alt='artwork'
              fill
              className='object-cover'
            />
          </div>
          <InformationContainer>
            <ExhibitionTitle>Sanal Sergi Deneyimi</ExhibitionTitle>
            <div className='flex flex-col justify-center items-center'>
              <InfoText>Başlamak için ENTER a basın.</InfoText>
              <InfoText>
                Gezinmek için ok tuşlarını veya W A S D tuşlarını kullanın.
              </InfoText>
              <InfoText>Etrafa bakmak için fareyi hareket ettirin.</InfoText>
              <InfoText>Çıkmak için sağ üstteki çarpıya basın.</InfoText>
            </div>
            <StartButton onClick={handleStartClick}>Sergiyi Gör</StartButton>
          </InformationContainer>
        </MenuContainer>
      )}
      <ThreeDExhibition artworks={artworks}></ThreeDExhibition>
    </>
  );
};
export default StartMenu;
