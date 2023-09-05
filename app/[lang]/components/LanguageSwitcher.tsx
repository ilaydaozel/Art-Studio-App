'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

const LanguageContainer = styled.div`
  display: flex;
  gap: 0 0.4rem;
  padding: 0 0.5rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  @media (max-width: 768px) {
    gap: 0.2rem;
    padding: 0 0.4rem;
  }
  @media (max-width: 576px) {
    gap: 0.1rem;
    padding: 0 0.3rem;
  }
`;
const LanguageText = styled.text<{ isActive: boolean }>`
  font-size: 1rem;
  color: ${(props) => (props.isActive ? COLORS.darkGray : COLORS.gray)};
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
  @media (max-width: 576px) {
    font-size: 0.6rem;
  }
`;
export default function LanguageSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  const isHomePage =
    i18n.locales.find((locale) => pathName === `/${locale}`) !== undefined;

  const currentLocale =
    pathName &&
    ((i18n.locales.includes(
      pathName.split('/')[1] as (typeof i18n.locales)[number]
    )
      ? pathName.split('/')[1]
      : i18n.defaultLocale) as (typeof i18n.locales)[number]);

  return (
    <LanguageContainer>
      {i18n.locales.map((locale) => {
        return (
          <div key={locale}>
            <Link href={redirectedPathName(locale)}>
              <LanguageText
                isHomePage={isHomePage}
                isActive={currentLocale === locale}
              >
                {locale}
              </LanguageText>
            </Link>
          </div>
        );
      })}
    </LanguageContainer>
  );
}
