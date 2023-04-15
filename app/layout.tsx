import React from "react";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import Modal from "@/app/components/modal/Modal";
import ToasterProvider from "./providers/ToasterProvider";

export const metadata = {
  title: "Konak Sanat Akademisi",
  description: "Konak Sanat Akademisi Website",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <Modal
            isOpen
            title="Kapat"
            actionLabel="Kapattt"
            secondaryActionLabel="Kapat here"
          />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
