'use client';

import type { AppelOffreResponseDTO } from '@/types/appelOffre';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AppelOffreDetailPage() {
  const { id } = useParams();                // récupère le [id] de l’URL
  const [ao, setAo] = useState<AppelOffreResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/appeloffre/${id}`, {
          headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Impossible de charger');
        const data = (await res.json()) as AppelOffreResponseDTO;
        setAo(data);
      } catch {
        router.push('/dashboard/aoffres');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  if (loading) return <div>Chargement…</div>;
  if (!ao)     return <div>Introuvable</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">{ao.titre}</h1>
      <p><strong>Client :</strong> {ao.nomClient}</p>
      <p><strong>Date limite :</strong> {new Date(ao.dateLimite).toLocaleDateString()}</p>
      <p><strong>Statut :</strong> {ao.statut}</p>
      <p><strong>Description :</strong><br />{ao.description}</p>
      {/* … bouton modifier, supprimer, etc. … */}
    </div>
  );
}
