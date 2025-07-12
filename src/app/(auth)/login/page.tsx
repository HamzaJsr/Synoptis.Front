// src/app/(auth)/login/page.tsx
'use client';

import { jwtDecode } from 'jwt-decode';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type TokenPayload = { role: string };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      'http://localhost:5268/Auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse }),
      }
    );
    const { token, errorMessage } = await res.json();
    if (!res.ok || errorMessage) {
      return alert(errorMessage || 'Échec de la connexion');
    }
    localStorage.setItem('synoptis_token', token);
    const { role } = jwtDecode<TokenPayload>(token);
    if (role === 'ResponsableAgence') {
      router.push('/ra/dashboard');
    } else if (role === 'ChargeAffaires') {
      router.push('/caffaires/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-slate/10 flex items-center justify-center p-6">
      <div className="bg-brand-light rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Logo */}
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
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Pas encore de compte?{' '}
          <Link
            href="/signup"
            className="text-brand-primary hover:underline"
          >
            Inscription
          </Link>
        </p>
      </div>
    </main>
  );
}
