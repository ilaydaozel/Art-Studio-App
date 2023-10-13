import { TranslationContext } from '@/app/contexts/TranslationContext';
import { Language } from '@/app/types/language';
import { COLORS } from '@/constants/colors';
import { useContext } from 'react';
import styled from 'styled-components';

interface LanguageSwitcherProps {
  color: string;
}

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  cursor: pointer;

  @media (max-width: 576px) {
    gap: 0.3rem;
  }
`;

const Option = styled.div<{ isActive: boolean; color: string }>`
  text-align: center;
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: ${(props) => props.isActive && 'bold'};
  font-size: 0.85rem;
  position: relative;
  overflow: hidden;
  color: ${(props) => props.color};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.8px;
    background-color: ${(props) => props.color + '50'};
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover::before {
    transform: translateX(0);
  }

  @media (max-width: 992px) {
    font-size: 0.8rem;
  }

  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;

const LanguageSwitcher = ({ color }: LanguageSwitcherProps) => {
  const { language, switchLanguage } = useContext(TranslationContext);

  return (
    <Container>
      <Option
        color={color}
        isActive={language === ('tr' as Language)}
        onClick={() => switchLanguage('tr' as Language)}
      >
        Türkçe
      </Option>
      <Option
        color={color}
        isActive={language === ('en' as Language)}
        onClick={() => switchLanguage('en' as Language)}
      >
        English
      </Option>
    </Container>
  );
};
export default LanguageSwitcher;
