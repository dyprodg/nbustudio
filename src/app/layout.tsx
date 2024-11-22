import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import CookieBanner from "@/components/cookie-banner";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import SmoothScrolling from "@/utils/smoothscroll";
Amplify.configure(config);

export const metadata = {
  title:
    "NBU STUDIO | Professionelles Tonstudio in Kreuzlingen, Schweiz | Hip-Hop, Analogaufnahmen, Mixing & Mastering",
  description:
    "NBU STUDIO ist Ihr professionelles Tonstudio in Kreuzlingen, Schweiz. Spezialisiert auf Hip-Hop und Pop, Analogaufnahmen, Gesangsaufnahmen, Mixing, Mastering, Coverart, Beratung, Songwriting und Producing. Wir bieten erstklassige Musikproduktionen mit extrem hochwertigem Equipment.",
  keywords: [
    "Tonstudio",
    "Kreuzlingen",
    "Schweiz",
    "Hip-Hop",
    "Analogaufnahmen",
    "Gesangsaufnahmen",
    "Mixing",
    "Mastering",
    "Coverart",
    "Beratung",
    "Songwriting",
    "Producing",
    "Musikproduktion",
    "Hochwertiges Equipment",
  ],
};

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={poppins.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SmoothScrolling>
            <Navbar />
            {children}
          </SmoothScrolling>
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
