'use client';
import React from 'react';
import { TranslationContext } from './TranslationContext';

const TranslationContextWrapper = ({
  children,
  translationData,
}: {
  children: React.ReactNode;
  translationData: any;
}) => {
  return (
    <TranslationContext.Provider value={translationData}>
      {children}
    </TranslationContext.Provider>
  );
};

export default TranslationContextWrapper;
