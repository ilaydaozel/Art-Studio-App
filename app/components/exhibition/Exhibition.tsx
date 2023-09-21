'use client';
import styled from 'styled-components';
import { useState } from 'react';
import Popup from '@/app/components/popup/Popup';
import { IExhibition, IArtwork } from '@/app/types';
import StartMenu from '@/app/components/virtualExhibition/StartMenu';

interface ExhibitionProps {
  exhibition: IExhibition;
}

const ExhibitonBox = styled.div<{ backgroundImgUrl: string }>`
  display: flex;
  justify-content: center;
  width: 20vw;
  height: 20vw;
  background-image: url(${(props) => props.backgroundImgUrl});
  background-size: cover;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  margin: 10px;
  position: relative;
  font-size: 1.5rem;
  transition: font-size 0.2s background-color:0.2s;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    transition: background-color 0.2s;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.4);
  }

  &:hover {
    font-size: 1.7rem;
  }

  @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
    font-size: 1.2 rem;
    &:hover {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    width: 40vw;
    height: 40vw;
    font-size: 1rem;
    &:hover {
      font-size: 1.2rem;
    }
  }
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const Exhibition = ({ exhibition }: ExhibitionProps) => {
  const [showExhibition, setShowExhibition] = useState(false);
  return (
    <>
      <ExhibitonBox
        onClick={() => setShowExhibition(true)}
        backgroundImgUrl='https://res.cloudinary.com/dnlz4muyb/image/upload/v1691094915/j0dfdld8wjk1cdgb8afs.jpg'
      >
        <InformationContainer></InformationContainer>
      </ExhibitonBox>
      {showExhibition && (
        <Popup
          onClose={() => setShowExhibition(false)}
          width='100%'
          isFullScreen={true}
          body={<StartMenu artworks={exhibition.artworks}></StartMenu>}
        ></Popup>
      )}
    </>
  );
};
export default Exhibition;
