import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROOZ Special Offer | Claim Your Free Phone Pouch Sample",
  description:
    "Exclusive offer for educators: Experience ROOZ phone pouches firsthand. Enter your code to claim a free sample and see how our innovative locking system transforms classroom focus. Limited time offer for schools and districts.",

  keywords: [
    "ROOZ free sample",
    "phone pouch free trial",
    "educator exclusive offer",
    "classroom phone solution demo",
    "school phone pouch trial",
    "ROOZ special promotion",
    "phone-free classroom starter",
    "educational technology sample",
    "teacher discount ROOZ",
    "school district trial program",
    "phone management solution demo",
    "ROOZ educator program",
  ],

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
    title: "Claim Your Free ROOZ Phone Pouch Sample | Exclusive Educator Offer",
    description:
      "Exclusive offer: Try ROOZ phone pouches risk-free. Enter your code to claim a free sample and experience the difference. Limited availability for schools and districts.",
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
    title: "ROOZ Special Offer - Free Sample for Educators",
    description:
      "Transform your classroom with ROOZ. Enter your code to claim your free phone pouch sample. Limited time offer.",
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
