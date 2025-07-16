'use client';

import { UserResponseDTO, UserShortDTO } from '@/types';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

export default function EquipePage() {
  const [loading, setLoading]     = useState(true);
  const [role, setRole]           = useState<string| null>(null);
  const [responsable, setResponsable] = useState<UserShortDTO | null>(null);
  const [collaborateurs, setCollaborateurs] = useState<UserShortDTO[]>([]);
  const [collegues, setCollegues] = useState<UserShortDTO[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('synoptis_token');
    if (!token) {
      router.push('/login');
      return;
    }
    const { role, nameid } = jwtDecode<Payload>(token);
    setRole(role);

    (async () => {
      const res  = await fetch(`http://192.168.1.182:5268/user/${nameid}`);
      const data = (await res.json()) as UserResponseDTO;

      setResponsable(data.responsable ?? null);
      setCollaborateurs(data.collaborateurs ?? []);
      setCollegues(data.collegues ?? []);
      setLoading(false);
    })();
  }, [router]);

  if (loading) return <div>Chargement…</div>;

  // Si c'est un ResponsableAgence : on affiche ses collaborateurs (et on surligne la/la secrétaire)
  if (role === 'ResponsableAgence') {
    const secretaire = collaborateurs.find(u => u.role === 'Secretaire');
    const otherCollabs = collaborateurs.filter(u => u.role !== 'Secretaire');

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Mon équipe</h1>

        {secretaire && (
          <section>
            <h2 className="text-2xl font-semibold">Secrétaire</h2>
            <div className="p-4 bg-gray-800 rounded">
              <p>{secretaire.nom}</p>
              <p className="text-sm text-gray-400">{secretaire.email}</p>
            </div>
          </section>
        )}

        {otherCollabs.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold">Collaborateurs</h2>
            <ul className="space-y-2">
              {otherCollabs.map(u => (
                <li key={u.id} className="p-3 bg-gray-800 rounded">
                  <p>{u.nom}</p>
                  <p className="text-sm text-gray-400">{u.email}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  // Sinon (CA/secrétaire) : on affiche responsable + collègues
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mon équipe</h1>

      {responsable && (
        <section>
          <h2 className="text-2xl font-semibold">Responsable</h2>
          <div className="p-4 bg-gray-800 rounded">
            <p>{responsable.nom}</p>
            <p className="text-sm text-gray-400">{responsable.email}</p>
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold">Collègues</h2>
        {collegues.length > 0 ? (
          <ul className="space-y-2">
            {collegues.map(u => (
              <li key={u.id} className="p-3 bg-gray-800 rounded">
                <p>{u.nom}</p>
                <p className="text-sm text-gray-400">{u.email}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Aucun collègue</p>
        )}
      </section>
    </div>
  );
}
