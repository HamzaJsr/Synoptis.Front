// src/app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="flex items-center justify-center min-h-full py-16">
      <div className="bg-brand-light rounded-3xl shadow-2xl p-10 w-full max-w-lg text-center">
        {/* Logo centré */}
        <Image
          src="/logo-synoptis.png"
          alt="Synoptis"
          width={120}
          height={120}
          className="mx-auto"
        />

        {/* Titre impactant */}
        <h1 className="mt-6 text-5xl font-extrabold text-brand-dark leading-tight">
          Bienvenue sur <span className="text-brand-primary">Synoptis</span>
        </h1>

        {/* Description concise */}
        <p className="mt-4 text-gray-600">
          Gérez vos appels d’offres et vos documents en toute simplicité.
        </p>

        {/* Boutons d’action */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
            href="/login"
            className="
              px-8 py-3
              border-2 border-brand-primary text-brand-primary
              font-medium rounded-lg
              hover:bg-brand-primary hover:text-cyan-700
              focus:outline-none focus:ring-4 focus:ring-brand-primary/50
              transition
            "
          >
            Connexion
          </Link>
          
          <Link
            href="/signup"
            className="
              px-8 py-3
              border-2 border-brand-primary text-brand-primary
              font-medium rounded-lg
              hover:bg-brand-primary hover:text-cyan-700
              focus:outline-none focus:ring-4 focus:ring-brand-primary/50
              transition
            "
          >
            Inscription
          </Link>
        </div>
      </div>
    </section>
  )
}
