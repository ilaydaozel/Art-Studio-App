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
const Option = styled.div<{ isSelected: boolean }>`
  color: ${(props) =>
    props.isSelected ? `${COLORS.darkGray}` : `${COLORS.gray}`};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  border-bottom: ${(props) => (props.isSelected ? '1px solid' : 'none')};
  font-size: 1.1rem;
  line-height: 1.05rem;
  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 0.85rem;
  }
  @media (max-width: 576px) {
    font-size: 0.8rem;
    line-height: 0.75rem;
  }
`;

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(TranslationContext);

  return (
    <Container>
      <Option
        isSelected={language === ('tr' as Language)}
        onClick={() => switchLanguage('tr' as Language)}
      >
        tr
      </Option>
      <Option
        isSelected={language === ('en' as Language)}
        onClick={() => switchLanguage('en' as Language)}
      >
        en
      </Option>
    </Container>
  );
};
export default LanguageSwitcher;
