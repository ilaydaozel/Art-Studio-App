'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { COLORS } from '@/constants/colors';
import ComponentWithHeading from '../layouts/ComponentWithHeading';

interface AboutProps {
  exhibition: IExhibition;
  isEditable?: boolean;
}

const DescriptionText = styled.div`
  font-size: 1rem;
  color: ${COLORS.darkGray};
`;

const About = ({ exhibition, isEditable = false }: AboutProps) => {
  const location = {
    element: 'list',
    superElement: 'artist_profile',
  };
  const t = useTranslate();

  return (
    <ComponentWithHeading headingText={'Hakkında'}>
      <DescriptionText>{exhibition.description}</DescriptionText>
    </ComponentWithHeading>
  );
};

export default About;
