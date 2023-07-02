'use client';

import Image from 'next/image';
import styled from 'styled-components';

interface CarrouselProps {}

const Container = styled.div`
  height: 100px;
  width: full;
  background: black;
`;

export const Carrousel = ({}: CarrouselProps) => {
  return <Container></Container>;
};
