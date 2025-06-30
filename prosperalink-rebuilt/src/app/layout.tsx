import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProsperaLink - Formation d'entreprises LLC",
  description: "Service professionnel de formation d'entreprises LLC aux États-Unis. Formation rapide, sécurisée et économique.",
  keywords: "LLC, formation entreprise, Delaware, Wyoming, EIN, business formation",
  authors: [{ name: "ProsperaLink" }],
  openGraph: {
    title: "ProsperaLink - Formation d'entreprises LLC",
    description: "Service professionnel de formation d'entreprises LLC aux États-Unis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
