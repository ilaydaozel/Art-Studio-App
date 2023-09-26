'use client';
import styled from 'styled-components';
import { IExhibition } from '@/app/types';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/constants/routes';
import { getDateString } from '../utils/Helper';

interface ExhibitionProps {
  exhibition: IExhibition;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-0.8rem);
  }
`;

const TitleText = styled.div`
  font-size: 1rem;
  font-weight: bold;
  @media (max-width: 768px) {
    font-size: 1 rem;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const DateText = styled.div`
  font-size: 0.8rem;
  @media (max-width: 768px) {
    font-size: 0.6 rem;
  }
  @media (max-width: 480px) {
    font-size: 0.4rem;
  }
`;

const ExhibitonImage = styled.div<{ backgroundImgUrl: string }>`
  width: 20vw;
  height: 20vw;
  background-image: url(${(props) => props.backgroundImgUrl});
  background-size: cover;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 30vw;
    height: 30vw;
  }

  @media (max-width: 576px) {
    width: 40vw;
    height: 40vw;
  }
`;

const ExhibitionPreview = ({ exhibition }: ExhibitionProps) => {
  return (
    <Link href={`${ROUTE_PATHS.EXHIBITION}/${exhibition.id}`}>
      <Wrapper>
        <ExhibitonImage backgroundImgUrl={exhibition.coverImage || ''} />
        <TitleText>{exhibition.title}</TitleText>
        <DateText>
          {getDateString(exhibition.startDate, exhibition.endDate)}
        </DateText>
      </Wrapper>
    </Link>
  );
};
export default ExhibitionPreview;
