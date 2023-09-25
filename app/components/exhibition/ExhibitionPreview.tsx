'use client';
import styled from 'styled-components';
import { IExhibition } from '@/app/types';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/constants/routes';

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

const Exhibition = ({ exhibition }: ExhibitionProps) => {
  return (
    <Link href={`${ROUTE_PATHS.EXHIBITION}/${exhibition.id}`}>
      <ExhibitonBox backgroundImgUrl={exhibition.coverImage || ''} />
    </Link>
  );
};
export default Exhibition;
