import { createContext } from 'react';
import { Action } from '../reducers/language/type';
import { ILanguageData } from '@/languages/type';
import EnglishData from '@/languages/en';
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
export const TranslationDispatchContext = createContext<React.Dispatch<Action>>(
  () => {}
);
