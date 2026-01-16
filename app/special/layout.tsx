import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROOZ - Phone Pouches for Schools | Unlock Student Potential",
  description:
    "ROOZ secure phone pouches help schools minimize distractions and maximize learning. Our innovative locking system supports phone-free classrooms, helping students focus and teachers teach uninterrupted. Trusted by educators nationwide.",

  keywords: [
    "phone pouches for schools",
    "classroom phone management",
    "student focus tools",
    "phone-free learning",
    "school phone policy",
    "distraction-free classroom",
    "educational phone locks",
    "student concentration tools",
    "phone ban solutions",
    "ROOZ pouches",
    "classroom management tools",
    "student engagement solutions",
  ],

  authors: [{ name: "ROOZ" }],

  creator: "ROOZ",
  publisher: "ROOZ",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  metadataBase: new URL("https://myrooz.com"), // Replace with your actual domain

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myrooz.com", // Replace with your actual domain
    siteName: "ROOZ",
    title:
      "ROOZ - Secure Phone Pouches for Schools | Focus & Learning Solutions",
    description:
      "Transform your classroom with ROOZ phone pouches. 98% less distractions, 84% focus increase. Simple, secure, and trusted by teachers nationwide. Lock away distractions, unlock potential.",
    images: [
      {
        url: "/hero/OnPhone.webp", // Using your existing hero image
        width: 1200,
        height: 630,
        alt: "ROOZ Phone Pouches - Unlock Student Potential",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ROOZ - Phone Pouches for Schools | Unlock Student Potential",
    description:
      "Secure phone pouches that help students focus and teachers teach. 98% less distractions. Trusted by educators nationwide.",
    images: ["/hero/OnPhone.webp"], // Using your existing hero image
    creator: "@rooz", // Replace with your actual Twitter handle
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
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
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
