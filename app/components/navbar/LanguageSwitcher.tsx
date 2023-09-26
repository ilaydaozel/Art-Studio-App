import { TranslationContext } from '@/app/contexts/TranslationContext';
import { Language } from '@/app/types/language';
import { COLORS } from '@/constants/colors';
import { useContext, ChangeEvent } from 'react';
import styled from 'styled-components';

const Select = styled.select`
  background-color: transparent;
  outline: none;
  font-size: 1rem;
  color: ${COLORS.gray};
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;
const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(TranslationContext);
  const handleSwitchLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    switchLanguage(event.target.value as Language);
  };

  return (
    <Select value={language} onChange={handleSwitchLanguage}>
      <option value='en'>English</option>
      <option value='tr'>Türkçe</option>
    </Select>
  );
};
export default LanguageSwitcher;
