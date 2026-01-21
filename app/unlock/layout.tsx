import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Unlock Your Rooz Pouch",

  authors: [{ name: "ROOZ" }],

  creator: "ROOZ",
  publisher: "ROOZ",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://myrooz.com/unlock"),

  alternates: {
    canonical: "/unlock",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myrooz.com/unlock",
    siteName: "ROOZ",
    title: "How to Unlock Your Rooz Pouch",

    images: [
      {
        url: "/specail/hero.webp",
        width: 1200,
        height: 630,
        alt: "ROOZ Phone Pouches - Free Sample for Educators",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "How to Unlock Your Rooz Pouch",

    images: ["/specail/hero.webp"],
    creator: "@rooz",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
  },

  category: "Education Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
