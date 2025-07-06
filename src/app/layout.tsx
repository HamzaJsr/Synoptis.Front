// affiche le logo en header, wrappe tout le site
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-brand-light text-brand-dark">
        <header className="bg-brand-dark text-white px-6 py-4 flex items-center">
          <Link href="/">
            <Image src="/logo-synoptis.png" alt="Synoptis" width={40} height={40} />
          </Link>
          <h1 className="ml-3 text-xl font-bold">Synoptis</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
