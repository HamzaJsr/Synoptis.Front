'use client';

import { AppelOffreShortDTO, UserShortDTO } from '@/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

interface Props { userId: string; }

export default function DashboardRA({ userId }: Props) {
  const [collaborateurs, setCollaborateurs] = useState<UserShortDTO[]>([]);
  const [offers, setOffers] = useState<AppelOffreShortDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      // charge l'utilisateur complet pour récupérer son équipe et ses AO
      const res = await fetch(`/api/users/${userId}`, {
         // Empêche Safari de renvoyer une réponse cachée
        cache: 'no-store',
      });
      const data = await res.json() as {
        collaborateurs: UserShortDTO[];
        appelOffres: AppelOffreShortDTO[];
      };
      setCollaborateurs(data.collaborateurs || []);
      setOffers(data.appelOffres || []);
    })();
  }, [userId]);

  return (
    <div className="w-full space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tableau de bord : Responsable d'agence</h1>
        <Link
          href="/dashboard/aoffres/new"
          className="px-4 py-2 bg-green-500 rounded text-white hover:bg-green-600"
        >
          + Nouvel appel d’offre
        </Link>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Mes collaborateurs</h2>
        <ul className="space-y-1">
          {collaborateurs.map(c => (
            <li key={c.id} className="p-2 bg-gray-800 rounded text-white">
              {c.nom} – {c.email}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Tous mes appels d’offres</h2>
        <ul className="space-y-2 grid grid-cols-4 gap-1.5">
          {offers.map(ao => (
            <li key={ao.id}>
              <Link 
                href={`/dashboard/aoffres/${ao.id}`}
                className="block p-4 bg-gray-800 rounded hover:bg-gray-700 text-white"
              >
                <strong>{ao.titre}</strong> – {ao.nomClient}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
