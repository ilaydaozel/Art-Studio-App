import { TranslationContext } from '@/app/contexts/TranslationContext';
import { Language } from '@/app/types/language';
import { useContext, ChangeEvent } from 'react';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useContext(TranslationContext);
  const handleSwitchLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    switchLanguage(event.target.value as Language);
  };

  return (
    <select
      className='bg-transparent outline-none text-neutral-400'
      value={language}
      onChange={handleSwitchLanguage}
    >
      <option value='en'>English</option>
      <option value='tr'>Turkish</option>
    </select>
  );
};
export default LanguageSwitcher;
