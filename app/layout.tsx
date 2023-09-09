import React from 'react';
import './assets/globals.css';
import { DM_Sans } from 'next/font/google';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import StyledComponentsRegistry from './libs/registry';
import ToasterProvider from './providers/ToasterProvider';
import TranslationProvider from './providers/TranslationProvider';
import { fetchTranslations } from '@/app/libs/languageDictionary';

export const metadata = {
  title: 'Konak Sanat Akademisi',
  description: 'Konak Sanat Akademisi Website',
};

const font = DM_Sans({
  subsets: ['latin'],
  weight: '400',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en'>
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
            <TranslationProvider fetchTranslations={fetchTranslations}>
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
            </TranslationProvider>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
