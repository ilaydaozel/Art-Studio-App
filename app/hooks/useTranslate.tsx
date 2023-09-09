import { useContext } from 'react';
import { TranslationContext } from '@/app/contexts/TranslationContext';

export default function useTranslate() {
  const { messages } = useContext(TranslationContext);

  return function translate(
    text: string,
    { element, superElement }: { element?: string; superElement?: string }
  ): string {
    let translation: string = text;

    if (
      superElement &&
      element &&
      messages[superElement] &&
      messages[superElement][element]
    ) {
      const translatedValue = messages[superElement][element];
      if (typeof translatedValue === 'string') {
        translation = translatedValue;
      }
    }

    if (element && messages[element] && messages[element][text]) {
      const translatedValue = messages[element][text];
      if (typeof translatedValue === 'string') {
        translation = translatedValue;
      }
    }

    return translation;
  };
}
