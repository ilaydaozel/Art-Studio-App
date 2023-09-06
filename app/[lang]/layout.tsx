import React from 'react';
import './globals.css';
import { DM_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import getCurrentUser from './actions/getCurrentUser';
import ClientOnly from './components/ClientOnly';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import StyledComponentsRegistry from './libs/registry';
import ToasterProvider from './providers/ToasterProvider';
import { Locale, i18n } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';

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
  params: { lang: Locale };
}) {
  let { lang } = params;
  const currentUser = await getCurrentUser();
  const { navbar } = await getDictionary(lang);
  // Validate that the incoming `locale` parameter is a valid locale
  if (params.lang !== lang) {
    notFound();
  }

  return (
    <html lang={lang}>
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
            <ClientOnly>
              <ToasterProvider />
              <Navbar
                messages={navbar}
                currentUser={currentUser ? currentUser.currentUser : null}
              />
            </ClientOnly>

            {children}

            <ClientOnly>
              <Footer />
            </ClientOnly>
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
