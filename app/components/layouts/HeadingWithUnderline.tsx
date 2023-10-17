'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface HeadingWithUnderlineProps {
  title: string;
  size?: string;
}

const Container = styled.div`
  width: 84%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionTitle = styled.div<{ size: string }>`
  width: 100%;
  font-size: ${(props) => props.size};
  color: ${COLORS.darkGray};
  text-align: left;
  margin: 2rem 0 0.25rem 0;
  border-bottom: 1px solid #e5e7eb;
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const HeadingWithUnderline = ({
  title,
  size = '1.2rem',
}: HeadingWithUnderlineProps) => {
  return (
    <Container>
      <SectionTitle size={size}>{title}</SectionTitle>
    </Container>
  );
};

export default HeadingWithUnderline;
