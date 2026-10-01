import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vistaravalley.com"),

  title:
    "Vistara Valley | Premium Residential & Commercial Plots in Khargone",

  description:
    "Discover Vistara Valley, a premium residential and commercial plotted development on Khandwa Road, Khargone, designed for modern living, connectivity and long-term opportunity.",

  keywords: [
    "Vistara Valley",
    "Vistara Valley Khargone",
    "residential plots in Khargone",
    "commercial plots in Khargone",
    "plots on Khandwa Road Khargone",
    "residential and commercial plots in Khargone",
    "premium plotted development in Khargone",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "Vistara Valley | Premium Residential & Commercial Plots in Khargone",

    description:
      "Premium residential and commercial plots on Khandwa Road, Khargone.",

    type: "website",

    locale: "en_IN",

    siteName: "Vistara Valley",

    url: "https://www.vistaravalley.com",

    images: [
      {
        url: "/images/hero-entrance.jpg",
        width: 1200,
        height: 630,
        alt: "Vistara Valley premium residential and commercial plotted development",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Vistara Valley | Premium Residential & Commercial Plots in Khargone",

    description:
      "Premium residential and commercial plots on Khandwa Road, Khargone.",

    images: ["/images/hero-entrance.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}