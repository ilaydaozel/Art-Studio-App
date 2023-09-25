'use client';

import styled from 'styled-components';
import useTranslate from '../../hooks/useTranslate';
import { IExhibition } from '@/app/types';
import { COLORS } from '@/constants/colors';

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
  const getDateString = (): string => {
    let startDateString = '';
    let endDateString = '';

    if (exhibition.startDate) {
      const startDate = new Date(exhibition.startDate);
      const startDay = startDate.getDate();
      const startMonth = startDate.toLocaleString('default', {
        month: 'short',
      });
      startDateString = `${startDay} ${startMonth}`;
    }

    if (exhibition.endDate) {
      const endDate = new Date(exhibition.endDate);
      const endDay = endDate.getDate();
      const endMonth = endDate.toLocaleString('default', { month: 'short' });
      endDateString = `${endDay} ${endMonth}`;
    }

    return startDateString + ' - ' + endDateString;
  };

  return (
    <>
      <Container>
        <LeftWrapper>
          <TitleText>{exhibition.title}</TitleText>
          <DateText>{getDateString()}</DateText>
        </LeftWrapper>
        <DescriptionText>{exhibition.description}</DescriptionText>
      </Container>
    </>
  );
};

export default About;
