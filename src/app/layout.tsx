import { ThemeProvider } from 'next-themes';
import "./globals.css";
import Navbar from '@/components/Navbar';
import { Poppins } from "next/font/google";
import CookieBanner from '@/components/cookie-banner';
import { Amplify } from 'aws-amplify';
import config from '@/amplifyconfiguration.json';
Amplify.configure(config);

export const metadata = {
  title: "NBU STUDIO",
  description: "NBU STUDIO, Aufnahme und Produktion von Musik und Sprache, in Kreuzlingen, Schweiz",
};

const poppins = Poppins({ weight: '400', subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Navbar />
          {children}
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
