import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bechdel-Wallace Test Checker",
  description:
    "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
  openGraph: {
    title: "Bechdel-Wallace Test Checker",
    description:
      "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
    url: "https://bechdeltest.vercel.app/",
    siteName: "Bechdel-Wallace Test Checker",
    images: [
      {
        url: "/black-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Bechdel-Wallace Test Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bechdel-Wallace Test Checker",
    description:
      "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
    images: ["/black-logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
