import React from 'react';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { DM_Sans } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modal/LoginModal';
import AddArtworkModal from './components/modal/AddArtworkModal';
import getCurrentUser from './actions/getCurrentUser';
import Footer from './components/footer/Footer';
import { IUser } from './actions/type';

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
            <AddArtworkModal />
            <Navbar
              currentUser={currentUser ? currentUser.currentUser : null}
            />
          </ClientOnly>

          {children}

          <ClientOnly>
            <Footer />
          </ClientOnly>
        </div>
      </body>
    </html>
  );
}
