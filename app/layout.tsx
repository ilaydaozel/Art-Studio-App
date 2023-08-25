import React from 'react';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { DM_Sans } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modal/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/footer/Footer';
import StyledComponentsRegistry from './libs/registry';

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
