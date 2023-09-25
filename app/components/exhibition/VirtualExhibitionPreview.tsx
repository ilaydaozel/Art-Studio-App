'use client';
import styled from 'styled-components';
import { IExhibition } from '@/app/types';
import Link from 'next/link';
import { ROUTE_PATHS } from '@/constants/routes';
import VirtualExhibitionWithMenu from '../virtualExhibition/VirtualExhibitionWithMenu';

interface VirtualExhibitionPreviewProps {
  exhibition: IExhibition;
}

const ExhibitonBox = styled.div<{ backgroundImgUrl: string }>`
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 20vw;
  position: relative;
  background-image: url(${(props) => props.backgroundImgUrl});
  margin: 1rem;
`;

const VirtualExhibitionPreview = ({
  exhibition,
}: VirtualExhibitionPreviewProps) => {
  return (
    <ExhibitonBox backgroundImgUrl={exhibition.coverImage || ''}></ExhibitonBox>
  );
};
export default VirtualExhibitionPreview;
