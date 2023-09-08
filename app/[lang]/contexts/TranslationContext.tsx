'use client';
import { createContext, useContext } from 'react';
import tr from '@/dictionaries/tr.json';

const defaultLocalizationData = tr;

export const TranslationContext = createContext(defaultLocalizationData);
export const useTranslation = () => useContext(TranslationContext);
