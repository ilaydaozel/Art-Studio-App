'use client';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  TranslationDispatchContext,
  TranslationContext,
} from './TranslationContext';
import { ILanguageData } from '@/languages/type';
import { State } from '../reducers/language/type';
import { languageReducer } from '../reducers/language';
import { Language } from '../types/language';
import TurkishData from '@/languages/tr';

const initialState: State = {
  locale: 'en',
};

const TranslationProvider = ({
  children,
  fetchTranslations,
}: {
  children: React.ReactNode;
  fetchTranslations: any;
}) => {
  const [languageState, dispatch] = useReducer(languageReducer, initialState);
  const [{ language, messages }, setLanguage] = useState({
    language: 'tr' as Language,
    messages: TurkishData,
  });

  const initialStringsLoaded = useRef(false);

  const updateLanguage = useCallback(
    async (newLang: Language) => {
      if (initialStringsLoaded.current && newLang === language) return;
      console.log('newLang', newLang);
      const newStrings = await fetchTranslations({ language: newLang });
      initialStringsLoaded.current = true;

      setLanguage({
        language: newLang,
        messages: newStrings,
      });
    },
    [language, fetchTranslations]
  );

  useEffect(() => {
    updateLanguage(language);
  }, [language, updateLanguage]);

  const translationContext = {
    language,
    messages,
    switchLanguage: updateLanguage,
  };
  return (
    <TranslationContext.Provider value={translationContext}>
      <TranslationDispatchContext.Provider value={dispatch}>
        {children}
      </TranslationDispatchContext.Provider>
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
