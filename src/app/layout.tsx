import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProviders";
import Footer from "@/components/Footer";
import logo from "../../public/Logo.png";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Editor-As",
  description: "Editor-As is the Best Interactive Editor",
  // <link rel="icon" href="https://example.com/icon.png" />
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <link rel="icon" href={logo.src} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
