import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProsperaLink - Formation d'entreprises LLC aux États-Unis | IA Révolutionnaire",
  description: "Formation d'entreprises LLC en 12h grâce à l'IA. Service premium pour entrepreneurs internationaux. Formation rapide, support IA 24/7, conformité garantie.",
  keywords: ["LLC", "formation entreprise", "Delaware", "Wyoming", "EIN", "entrepreneurs internationaux", "conformité américaine", "IA", "intelligence artificielle"],
  authors: [{ name: "ProsperaLink Team" }],
  creator: "ProsperaLink",
  publisher: "ProsperaLink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://prosperalink.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ProsperaLink - Formation d'entreprises LLC avec IA",
    description: "Service premium de formation d'entreprises LLC avec IA. Formation en 12h, support IA 24/7, conformité garantie.",
    url: "https://prosperalink.com",
    siteName: "ProsperaLink",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ProsperaLink - Formation LLC avec IA",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProsperaLink - Formation d'entreprises LLC avec IA",
    description: "Service premium de formation d'entreprises LLC avec IA. Formation en 12h, support IA 24/7, conformité garantie.",
    images: ["/twitter-image.jpg"],
    creator: "@prosperalink",
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
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e40af" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ProsperaLink",
              "url": "https://prosperalink.com",
              "logo": "https://prosperalink.com/logo.png",
              "description": "Service premium de formation d'entreprises LLC avec IA",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "availableLanguage": ["French", "English"]
              },
              "sameAs": [
                "https://facebook.com/prosperalink",
                "https://twitter.com/prosperalink",
                "https://linkedin.com/company/prosperalink"
              ]
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <div className="flex-1 pt-16">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
