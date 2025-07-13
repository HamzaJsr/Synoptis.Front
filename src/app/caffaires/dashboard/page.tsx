'use client';

import Sidebar from '@/components/Sidebar';
import { UserResponseDTO } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

export default function CaffairesDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserResponseDTO | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('synoptis_token');
    if (!token) {
      router.push('/login');
      return;
    }
    const { role, nameid } = jwtDecode<Payload>(token);
    if (role !== 'ChargeAffaires') {
      router.push('/login');
      return;
    }

    (async () => {
      const res = await fetch(`http://localhost:5268/user/${nameid}`);
      const data = (await res.json()) as UserResponseDTO;
      setUser(data);
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div>
        <h1>Chargement...</h1>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Chargé d’affaires</h1>
        <h2 className="text-xl mb-6">Bienvenue {user?.nom}</h2>
        <h3 className="text-lg mb-2">Vos appels d’offres :</h3>
        <ul className="space-y-2">
          {user?.appelOffres.map(ao => (
            <li key={ao.id} className="p-4 bg-white rounded-xl shadow">
              <strong>{ao.titre}</strong> – {ao.nomClient} <br />
              Délai : {new Date(ao.dateLimite).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
