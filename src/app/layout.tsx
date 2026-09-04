import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#ffffff",
};
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dave | Make Money Online Uploading Videos & AI Video Datasets",
  description:
    "Looking for ways to make money online? Earn cash easily by uploading everyday videos. Dave also provides high-quality real-world video datasets for robotics labs and AI research.",
  keywords: [
    "make money online",
    "how to make money online",
    "easy money online",
    "upload videos for money",
    "video datasets",
    "robotics labs",
    "research lab data",
    "AI training data"
  ],
  openGraph: {
    title: "Dave | Make Money Online & AI Video Datasets",
    description: "Earn cash easily by uploading everyday videos. Dave provides high-quality real-world video datasets for robotics labs and AI research.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dave | Make Money Online & AI Video Datasets",
    description: "Earn cash easily by uploading everyday videos. Dave provides high-quality real-world video datasets for robotics labs and AI research.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "Dave",
      "description": "Dave connects creators looking to make money online by uploading videos with robotics labs and research facilities needing high-quality, real-world video datasets for AI training.",
      "url": "https://dave.network"
    },
    {
      "@type": "WebSite",
      "name": "Dave | Make Money Online & Video Datasets",
      "description": "The easiest way to make money online by recording everyday tasks. Providing robotics and AI labs with diverse video datasets.",
      "url": "https://dave.network"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
