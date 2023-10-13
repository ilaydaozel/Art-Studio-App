import { TranslationContext } from '@/app/contexts/TranslationContext';
import { Language } from '@/app/types/language';
import { COLORS } from '@/constants/colors';
import { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 0.3rem;
  cursor: pointer;
  margin: 2px;
`;
const Option = styled.div<{ isActive: boolean }>`
  text-align: center;
  padding: 2px 4px;
  color: ${(props) => props.color};
  cursor: pointer;
  transition: text-decoration 0.3s;
  font-weight: ${(props) => props.isActive && 'bold'};
  font-size: 0.85rem;
  position: relative;
  overflow: hidden;

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
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(TranslationContext);

  return (
    <Container>
      <Option
        isActive={language === ('tr' as Language)}
        onClick={() => switchLanguage('tr' as Language)}
      >
        Türkçe
      </Option>
      <Option
        isActive={language === ('en' as Language)}
        onClick={() => switchLanguage('en' as Language)}
      >
        English
      </Option>
    </Container>
  );
};
export default LanguageSwitcher;
