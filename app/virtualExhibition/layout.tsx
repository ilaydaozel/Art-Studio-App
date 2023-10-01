import React, { Suspense } from 'react';
import '@/app/assets/globals.css';
import { DM_Sans } from 'next/font/google';
import getCurrentUser from '../actions/user/getCurrentUser';
import StyledComponentsRegistry from '../lib/registry';
import TranslationProvider from '../providers/TranslationProvider';
import { fetchTranslations } from '@/app/lib/languageDictionary';
import Loading from './loading';

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
              <Suspense fallback={<Loading />}>{children}</Suspense>
            </TranslationProvider>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
