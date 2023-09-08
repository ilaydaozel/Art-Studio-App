import React from 'react';
import './assets/globals.css';
import { DM_Sans } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import StyledComponentsRegistry from './libs/registry';
import ToasterProvider from './providers/ToasterProvider';
import { i18n } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import { IPageProps } from './types/common';
import TranslationContextWrapper from './contexts/TranslationContextWrapper';

export const metadata = {
  title: 'Konak Sanat Akademisi',
  description: 'Konak Sanat Akademisi Website',
};

const font = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale: string) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: IPageProps;
}) {
  const currentUser = await getCurrentUser();
  const translationData = await getDictionary(params.lang);

  return (
    <html lang={params.lang}>
      <body className={font.className}>
        <StyledComponentsRegistry>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <TranslationContextWrapper translationData={translationData}>
              <ClientOnly>
                <ToasterProvider />
                <Navbar
                  currentUser={currentUser ? currentUser.currentUser : null}
                />
              </ClientOnly>

              {children}

              <ClientOnly>
                <Footer />
              </ClientOnly>
            </TranslationContextWrapper>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
