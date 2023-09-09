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
} from '../contexts/TranslationContext';
import { State } from '../reducers/language/type';
import { languageReducer } from '../reducers/language';
import { Language } from '../types/language';
import TurkishData from '@/languages/tr';

const initialState: State = {
  locale: 'tr',
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

  const initialStringsLoaded = useRef(false); // store information between re-renders (unlike regular variables, which reset on every render)

  const updateLanguage = useCallback(
    //cache a function definition between re-renders.
    async (newLang: Language) => {
      if (initialStringsLoaded.current && newLang === language) return;

      const newMessages = await fetchTranslations({ language: newLang });
      initialStringsLoaded.current = true;

      setLanguage({
        language: newLang,
        messages: newMessages,
      });
    },
    [language, fetchTranslations]
  );

  //The function you’re passing is later used as a dependency of some Hook. For example, you depend on this function from useEffect.
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
