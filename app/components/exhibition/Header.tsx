'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IArtistProfile, IArtwork, IExhibition } from '../../types';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import TextButton from '../buttons/TextButton';
import Popup from '../popup/Popup';
import useTranslate from '../../hooks/useTranslate';
import { getDateString } from '../utils/Helper';

interface HeaderProps {
  exhibition: IExhibition;
}

const Container = styled.div`
  width: 84vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  padding-bottom: 1rem;
`;

const HeaderImage = styled.div<{ backgroundImgUrl: string }>`
  width: 100%;
  height: 60vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.backgroundImgUrl});
  margin-bottom: 2rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.2rem;
`;

const InfoHeading = styled.text`
  font-size: 2rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
  letter-spacing: 3px;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const DateHeading = styled.text`
  font-style: italic;
  font-size: 1.1rem;
  color: ${COLORS.gray};
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Header = ({ exhibition }: HeaderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setHeaderArtwork] = useState(exhibition?.coverImage || '');

  const location = { element: 'artist_profile', superElement: 'header' };
  const t = useTranslate();

  return (
    <Container>
      <HeaderImage backgroundImgUrl={coverImage} />
      <InfoContainer>
        <InfoHeading>{exhibition.title}</InfoHeading>
        <DateHeading>
          {getDateString(exhibition.startDate, exhibition.endDate)}
        </DateHeading>
      </InfoContainer>
    </Container>
  );
};

export default Header;
