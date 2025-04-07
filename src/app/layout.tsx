import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://bechdeltest.vercel.app/"),
  title: "The Bechdel-Wallace Test",
  description:
    "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
  openGraph: {
    title: "The Bechdel-Wallace Test",
    description:
      "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
    url: "https://bechdeltest.vercel.app/",
    siteName: "The Bechdel-Wallace Test",
    images: [
      {
        url: "/black-logo.png",
        width: 1200,
        height: 627,
        alt: "Bechdel-Wallace Test Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bechdel-Wallace Test",
    description:
      "Check if a movie passes the Bechdel-Wallace Test. Enter a movie title and see the results.",
    images: ["https://bechdeltest.vercel.app/black-logo.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "black",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head className="bg-black">
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
