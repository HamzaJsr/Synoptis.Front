// src/app/layout.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  // On ne veut pas le header sur /login et /signup
  const hideHeader = path === '/login' || path === '/signup';

  return (
    <html lang="fr">
      <body className="min-h-screen bg-brand-light text-brand-dark flex flex-col">
        {/* Header conditionnel */}
        {!hideHeader && (
          <header className="bg-brand-dark text-white px-6 py-3 flex items-center justify-between shadow">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-synoptis.png"
                alt="Synoptis"
                width={32}
                height={32}
              />
              <span className="ml-2 text-lg font-semibold text-cyan-700" >Synoptis</span>
            </Link>
            <nav className="space-x-4">
              <Link href="/ra/dashboard" className="text-black hover:text-cyan-700">
                Dashboard
              </Link>
              <Link href="/login" className="text-black hover:text-cyan-700">
                Déconnexion
              </Link>
            </nav>
          </header>
        )}

        {/* Container principal */}
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
          {children}
        </main>

        {/* Footer global (optionnel) */}
        {!hideHeader && (
          <footer className="text-center text-sm text-gray-500 py-4">
            © {new Date().getFullYear()} Synoptis — Tous droits réservés
          </footer>
        )}
      </body>
    </html>
  );
}
