// src/app/(auth)/login/page.tsx
'use client';

import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type TokenPayload = { role: string };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
   const res = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, motDePasse }),
});
      const { token, errorMessage } = await res.json();

      if (!res.ok || errorMessage) {
        // affichage inline de l'erreur
        setError(errorMessage || 'Échec de la connexion');
      } else {
        localStorage.setItem('synoptis_token', token);
        const { role } = jwtDecode<TokenPayload>(token);
        router.push('/dashboard/aoffres');
      }
    } catch (err) {
      setError('Impossible de joindre le serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-slate/10 flex items-center justify-center p-6">
      <div className="bg-brand-light rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="mx-auto mb-6 w-24 h-24">
          <Image
            src="/logo-synoptis.png"
            alt="Logo Synoptis"
            width={96}
            height={96}
          />
        </div>

        <h1 className="text-3xl font-extrabold text-brand-dark mb-4">
          Connexion
        </h1>
        <p className="text-gray-600 mb-6">
          Entrez vos identifiants pour accéder à votre tableau de bord.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
              {error}
            </p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={e => setMotDePasse(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`
              w-full px-8 py-3 border-2 font-medium rounded-lg transition
              ${loading
                ? 'border-gray-300 text-gray-500 cursor-not-allowed'
                : 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-4 focus:ring-brand-primary/50'}
            `}
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Pas encore de compte?{' '}
          <Link href="/signup" className="text-brand-primary hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </main>
  );
}
