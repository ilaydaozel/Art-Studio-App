'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import styled from 'styled-components';
import { COLORS } from '@/constants/colors';

const LanguageContainer = styled.ul`
  display: flex;
  gap: 0.4rem;
`;
const LanguageText = styled.text<{ isActive: boolean }>`
  font-size: 1.1rem;
  color: ${(props) => (props.isActive ? COLORS.darkGray : COLORS.gray)};
  text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
`;
export default function LanguageSwitcher() {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
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
          <li key={locale}>
            <Link href={redirectedPathName(locale)}>
              <LanguageText isActive={currentLocale === locale}>
                {locale}
              </LanguageText>
            </Link>
          </li>
        );
      })}
    </LanguageContainer>
  );
}
