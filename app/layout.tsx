import type { Metadata } from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";

import {cn} from '@/lib/utils'

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ['300','400','500','600','700'],
});


export const metadata: Metadata = {
  title: "LiveCare",
  description: "A healthcare managment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn('min-h-screen bg-dark-300 font-sans antialiased',jakartaSans.variable)}
      >
        {children}
      </body>
    </html>
  );
}
