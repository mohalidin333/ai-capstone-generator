import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Capstone Generator",
  description: "Generate a capstone that tailored",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <head>
          <meta
            name="google-site-verification"
            content="6PxxrtSIjNZLkaAHTd1n_BTznEAEkzLWzG0B_VlyQ6c"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-YGSBKQNVGJ"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YGSBKQNVGJ');
          `}
          </Script>
        </head>

        {children}
        <Analytics />
      </body>
    </html>
  );
}
