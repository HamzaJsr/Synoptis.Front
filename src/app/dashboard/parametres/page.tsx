'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

export default function ParametresPage() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({ email: '', nom: '' });
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
    // charger les settings depuis l'API…
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
        <h1 className="text-2xl font-semibold text-teal-400">Chargement…</h1>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-full text-white rounded-lg max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-teal-400">Paramètres</h1>
      <form className="space-y-5">
        <div>
          <label className="block mb-1">Nom</label>
          <input
            type="text"
            value={settings.nom}
            onChange={e => setSettings({ ...settings, nom: e.target.value })}
            className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-700"
          />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={e => setSettings({ ...settings, email: e.target.value })}
            className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-teal-400 to-[#0f172a] rounded-lg font-semibold"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
}
