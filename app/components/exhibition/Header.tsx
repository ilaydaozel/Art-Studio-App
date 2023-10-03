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
  width: 84vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  padding-bottom: 1rem;
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
  return (
    <Container>
      <div className='w-[100%] h-[60%] mb-2 relative'>
        <Image
          src={exhibition?.coverImage || ''}
          alt={'Header image'}
          fill
          priority
          placeholder='blur'
          blurDataURL={exhibition?.coverImage || ''}
          style={{
            objectFit: 'cover',
          }}
        />
      </div>

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
