'use client';
import styled from 'styled-components';
import { IExhibition } from '@/app/types';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/constants/routes';
import { getDateString } from '../utils/Helper';
import { COLORS } from '@/constants/colors';
import Image from 'next/image';
interface ExhibitionProps {
  exhibition: IExhibition;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 10px;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-0.8rem);
  }
`;

const TitleText = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 1.2 rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DateText = styled.div`
  font-size: 0.8rem;
  color: ${COLORS.gray};
  @media (max-width: 768px) {
    font-size: 0.6 rem;
  }
  @media (max-width: 480px) {
    font-size: 0.4rem;
  }
`;

const ExhibitonImage = styled.div`
  position: relative;
  width: 35vw;
  height: 21vw;
  box-shadow: 0.6rem 0.6rem 1rem 0 rgba(0, 0, 0, 0.2);
  @media (max-width: 576px) {
    width: 60vw;
    height: 36vw;
  }
`;

const ExhibitionPreview = ({ exhibition }: ExhibitionProps) => {
  return (
    <Link href={`${ROUTE_PATHS.EXHIBITION}/${exhibition.id}`}>
      <Wrapper>
        <ExhibitonImage>
          <Image
            src={exhibition.coverImage || '/images/blurImage.jpg'}
            alt='Exhibition preview'
            fill
            quality={70}
            placeholder='blur'
            blurDataURL={'/images/blurImage.jpg'}
            className='object-cover'
          />
        </ExhibitonImage>
        <div>
          <TitleText>{exhibition.title}</TitleText>
          <DateText>
            {getDateString(exhibition.startDate, exhibition.endDate)}
          </DateText>
        </div>
      </Wrapper>
    </Link>
  );
};
export default ExhibitionPreview;
