'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { COLORS } from '@/constants/colors';
import { getDateString } from '../utils/Helper';

interface AboutProps {
  exhibition: IExhibition;
  isEditable?: boolean;
}

const Container = styled.div`
  display: flex;
  gap: 4rem;
  width: 90%;
`;

const TitleText = styled.div`
  font-size: 2rem;
`;

const DescriptionText = styled.div`
  font-size: 1.5rem;
  color: ${COLORS.darkGray};
`;
const DateText = styled.div`
  font-size: 0.8rem;
  color: ${COLORS.gray};
`;
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`;

const About = ({ exhibition, isEditable = false }: AboutProps) => {
  const location = {
    element: 'list',
    superElement: 'artist_profile',
  };
  const t = useTranslate();

  return (
    <>
      <Container>
        <LeftWrapper>
          <TitleText>{exhibition.title}</TitleText>
          <DateText>
            {getDateString(exhibition.startDate, exhibition.endDate)}
          </DateText>
        </LeftWrapper>
        <DescriptionText>{exhibition.description}</DescriptionText>
      </Container>
    </>
  );
};

export default About;
