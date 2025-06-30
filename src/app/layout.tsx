import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProsperaLink - Formation d'entreprises LLC",
  description: "Formez votre entreprise LLC en toute simplicité avec ProsperaLink. Services complets de formation d'entreprises aux États-Unis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          <header className="w-full border-b bg-white py-4 px-8 flex items-center justify-between">
            <span className="font-bold text-xl text-blue-700">ProsperaLink</span>
            <nav className="space-x-6">
              <a href="#services" className="hover:underline">Services</a>
              <a href="#pricing" className="hover:underline">Tarifs</a>
              <a href="#faq" className="hover:underline">FAQ</a>
              <a href="/auth/signin" className="font-semibold text-blue-700 hover:underline">Connexion</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="w-full border-t bg-gray-50 py-6 px-8 text-center text-gray-500 text-sm mt-16">
            © 2024 ProsperaLink LLC. Tous droits réservés.
          </footer>
        </Providers>
      </body>
    </html>
  );
} 