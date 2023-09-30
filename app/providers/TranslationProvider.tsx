'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TranslationContext } from '../contexts/TranslationContext';
import { Language } from '../types/language';
import TurkishData from '@/languages/tr';
import { ILanguageData } from '@/languages/type';
import EnglishData from '@/languages/en';

function getSelectedLanguage(): Language {
  return (sessionStorage.getItem('selectedLanguage') as Language) || 'tr';
}

function setSelectedLanguage(language: Language) {
  sessionStorage.setItem('selectedLanguage', language);
}

const TranslationProvider = ({
  children,
  fetchTranslations,
}: {
  children: React.ReactNode;
  fetchTranslations: any;
}) => {
  const [{ language, messages }, setLanguage] = useState<{
    language: Language;
    messages: ILanguageData;
  }>({
    language: getSelectedLanguage(),
    messages: (() => {
      const selectedLanguage = getSelectedLanguage();
      switch (selectedLanguage) {
        case 'tr':
          return TurkishData;
        case 'en':
          return EnglishData;
        default:
          return TurkishData; // Default to Turkish if the selected language is not recognized
      }
    })(),
  });

  const initialStringsLoaded = useRef(true);

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
      setSelectedLanguage(newLang);
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
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationProvider;
