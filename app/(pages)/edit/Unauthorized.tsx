'use client';

import { COLORS } from '@/constants/colors';
import React from 'react';
import styled from 'styled-components';
import { BsEyeSlash } from 'react-icons/bs';
import useTranslate from '@/app/hooks/useTranslate';

interface UnauthorizedProps {
  isAdminAuthorization?: boolean;
}
const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 100vh;
  }
`;

const Caption = styled.div`
  color: ${COLORS.red};
  font-size: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 576px) {
    font-size: 1.5rem;
  }
`;
const Subcaption = styled.h2`
  font-size: 1rem;
  color: ${COLORS.darkGray};
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;

const Unauthorized = ({ isAdminAuthorization }: UnauthorizedProps) => {
  const location = { element: 'unauthorized' };
  const t = useTranslate();
  return (
    <UnauthorizedContainer>
      <Caption>
        {t('caption', location)} <BsEyeSlash></BsEyeSlash>
      </Caption>
      <Subcaption>
        {isAdminAuthorization
          ? t('admin_subcaption', location)
          : t('user_subcaption', location)}
      </Subcaption>
    </UnauthorizedContainer>
  );
};

export default Unauthorized;
