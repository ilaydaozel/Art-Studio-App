'use client';

import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

interface HeadingWithUnderlineProps {
  title: string;
  size?: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionTitle = styled.div<{ size: string }>`
  width: 80%;
  font-size: ${(props) => props.size};
  font-weight: 500;
  color: ${COLORS.darkGray};
  text-align: left;
  margin: 2rem 0 0.25rem 0;
`;

const StyledDivider = styled.div`
  width: 84%;
  border-top: 1px solid #e5e7eb;
  height: 1px;
`;

const HeadingWithUnderline = ({
  title,
  size = '1.5rem',
}: HeadingWithUnderlineProps) => {
  return (
    <Container>
      <SectionTitle size={size}>{title}</SectionTitle>
      <StyledDivider />
    </Container>
  );
};

export default HeadingWithUnderline;
