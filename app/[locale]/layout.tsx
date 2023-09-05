import React from 'react';
import './globals.css';
import { DM_Sans } from 'next/font/google';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../components/ClientOnly';
import Footer from '../components/footer/Footer';
import LoginModal from '../components/modal/LoginModal';
import Navbar from '../components/navbar/Navbar';
import StyledComponentsRegistry from '../libs/registry';
import ToasterProvider from '../providers/ToasterProvider';
import { useLocale } from 'next-intl';
import { notFound } from 'next/navigation';

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
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();
  const currentUser = await getCurrentUser();
  // Validate that the incoming `locale` parameter is a valid locale
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
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
              <LoginModal />
              <Navbar
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
