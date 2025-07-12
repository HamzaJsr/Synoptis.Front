'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string };

export default function RADashboardPage() {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('synoptis_token');
    if (!token) {
      return router.push('/login');
    }
    const { role } = jwtDecode<Payload>(token);
    if (role !== 'ResponsableAgence') {
      return router.push('/login');
    }
    setOk(true);
  }, [router]);

  if (!ok) {
    return <div className="p-6 text-center">Vérification en cours…</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Responsable d’Agence</h1>
      {/* Ici on chargera la liste des appels et les boutons Go/NoGo */}
    </div>
  );
}
