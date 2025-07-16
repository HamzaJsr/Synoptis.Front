// src/app/(auth)/signup/page.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignupPage() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('http://192.168.1.182:5268/Auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, motDePasse }),
    })
    const { success, message } = await res.json()
    if (!success) {
      return alert(message || 'Échec de l’inscription')
    }
    alert('Inscription réussie ! Vous pouvez vous connecter.')
    router.push('/login')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-slate/10 flex items-center justify-center p-6">
      <div className="bg-brand-light rounded-3xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">
        {/* Logo */}
        <div className="mx-auto w-24 h-24 p-2 bg-white rounded-full shadow-inner">
          <Image
            src="/logo-synoptis.png"
            alt="Logo Synoptis"
            width={96}
            height={96}
       
          />
        </div>

        <h1 className="text-3xl font-extrabold text-brand-dark">
          Inscription
        </h1>
        <p className="text-gray-600">
          Créez votre compte pour débuter avec Synoptis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={e => setNom(e.target.value)}
            required
            className="
              w-full px-4 py-2
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-brand-primary
            "
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-2
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-brand-primary
            "
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            required
            className="
              w-full px-4 py-2
              border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-brand-primary
            "
          />
          <button
            type="submit"
              className="
              px-8 py-3
              border-2 border-brand-primary text-brand-primary
              font-medium rounded-lg
              hover:bg-brand-primary hover:text-cyan-700
              focus:outline-none focus:ring-4 focus:ring-brand-primary/50
              transition
            "
          >
            S’inscrire
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Déjà un compte ?{' '}
          <Link href="/login" className="text-brand-primary hover:underline">
            Connexion
          </Link>
        </p>
      </div>
    </main>
  )
}
