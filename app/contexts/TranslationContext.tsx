import { createContext } from 'react';
import { ILanguageData } from '@/languages/type';
import TurkishData from '@/languages/tr';
import { Language } from '../types/language';

export const TranslationContext = createContext<{
  language: Language;
  messages: ILanguageData;
  switchLanguage: (newLang: Language) => Promise<void>;
}>({
  language: 'tr' as Language,
  messages: TurkishData,
  switchLanguage: async () => {},
});
