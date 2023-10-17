'use client';

import { styled } from 'styled-components';
import HeadingWithUnderline from './HeadingWithUnderline';

interface ComponentWithHeadingProps {
  headingText: string;
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ComponentWithHeading = ({
  headingText = '',
  children,
}: ComponentWithHeadingProps) => {
  return (
    <LayoutContainer>
      <HeadingWithUnderline title={headingText}></HeadingWithUnderline>
      {children}
    </LayoutContainer>
  );
};
export default ComponentWithHeading;
