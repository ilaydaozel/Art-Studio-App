import { useContext } from 'react';
import { TranslationContext } from '@/app/contexts/TranslationContext';

function useTranslate(
  text: string,
  { element, superElement }: { element: string; superElement?: string }
): string {
  const { messages } = useContext(TranslationContext);
  let translation: string = text;

  if (element && text) {
    if (superElement) {
      const superElementObj = messages[superElement];
      if (superElementObj && element && text) {
        const elementObj = superElementObj[element];
        if (typeof elementObj === 'object') {
          if (elementObj && typeof elementObj[text] === 'string') {
            translation = elementObj[text] as string;
          }
        }
      }
    } else {
      const elementObj = messages[element];
      if (elementObj && typeof elementObj[text] === 'string') {
        translation = elementObj[text] as string;
      }
    }
  }

  return translation;
}

export default useTranslate;
