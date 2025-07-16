'use client';

import { AppelOffreShortDTO, UserShortDTO } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

interface Props { userId: string; }

export default function DashboardCA({ userId }: Props) {
  const [responsable, setResponsable] = useState<UserShortDTO | null>(null);
  const [collegues, setCollegues]     = useState<UserShortDTO[]>([]);
  const [offers, setOffers]           = useState<AppelOffreShortDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // charge l'utilisateur complet
      const res = await fetch(`http://192.168.1.182:5268/user/${userId}`);
      const data = await res.json() as {
        responsable: UserShortDTO;
        collegues: UserShortDTO[];
        appelOffres: AppelOffreShortDTO[];
      };
      setResponsable(data.responsable || null);
      setCollegues(data.collegues || []);
      setOffers(data.appelOffres || []);
    })();
  }, [userId]);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de bord CA</h1>
        <Link
          href="/dashboard/aoffres/new"
          className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600"
        >
          + Nouvel appel d’offre
        </Link>
      </header>

      {responsable && (
        <section>
          <h2 className="text-2xl font-semibold mb-2">Mon responsable</h2>
          <div className="p-3 bg-gray-800 rounded">
            {responsable.nom} – {responsable.email}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-2">Mes collègues</h2>
        {collegues.length > 0 ? (
          <ul className="space-y-1">
            {collegues.map(c => (
              <li key={c.id} className="p-2 bg-gray-800 rounded">
                {c.nom} – {c.email}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Aucun collègue</p>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Mes appels d’offres</h2>
        <ul className="space-y-2">
          {offers.map(ao => (
            <li key={ao.id}>
              <Link 
                href={`/dashboard/aoffres/${ao.id}`}
                className="block p-4 bg-gray-800 rounded hover:bg-gray-700"
              >
                <strong>{ao.titre}</strong> – {ao.nomClient}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
