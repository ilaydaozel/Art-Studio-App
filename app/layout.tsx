import React from 'react';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Nunito } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import ToasterProvider from './providers/ToasterProvider';
import RegisterModal from './components/modal/RegisterModal';
import LoginModal from './components/modal/LoginModal';
import ArtworkModal from './components/modal/ArtworkModal';
import getCurrentUser from './actions/getCurrentUser';
import { User } from '@prisma/client';
import BiographyModal from './components/modal/BiographyModal';
import ProfilePictureModal from './components/modal/ProfilePictureModal';

export const metadata = {
  title: 'Konak Sanat Akademisi',
  description: 'Konak Sanat Akademisi Website',
};

const font = Nunito({
  subsets: ['latin'],
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
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <ArtworkModal />
          <BiographyModal />
          <ProfilePictureModal />
          <Navbar currentUser={currentUser.currentUser} />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
