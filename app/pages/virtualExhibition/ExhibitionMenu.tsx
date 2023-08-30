'use client';
import { COLORS } from '@/constants/colors';
import styled from 'styled-components';

const MenuContainer = styled.div`
  width: 60%;
  margin: 20px;
  height: 300px;
  border: 1px solid ${COLORS.lightGray};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ExhibitionMenu = () => {
  return (
    <>
      <MenuContainer> Hey</MenuContainer>
    </>
  );
};
export default ExhibitionMenu;
