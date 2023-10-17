'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { IExhibition } from '../../types';
import { getDateString } from '../utils/Helper';
import Image from 'next/image';
interface HeaderProps {
  exhibition: IExhibition;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  position: relative;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 0.2rem;
  position: absolute;
  bottom: 14%;
  left: 10%;
  transform: translate(-10%, 14%);
`;

const InfoHeading = styled.text`
  font-size: 3rem;
  font-weight: bold;
  color: #ffffff;
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
  font-size: 1.4rem;
  color: ${COLORS.lightGray};
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Header = ({ exhibition }: HeaderProps) => {
  return (
    <Container>
      <Image
        src={exhibition?.coverImage || '/images/blurImage.jpg'}
        alt={'Header image'}
        fill
        priority
        placeholder='blur'
        blurDataURL={'/images/blurImage.jpg'}
        style={{
          objectFit: 'cover',
        }}
        className='brightness-75'
      />

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
