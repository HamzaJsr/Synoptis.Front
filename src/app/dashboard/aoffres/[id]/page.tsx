'use client';

import type { AppelOffreResponseDTO } from '@/types/appelOffre';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Synthese {
  dateVisite: string;
  nomClient: string;
  adresseProjet: string;
  penalite: string;
  sujet: string;
  budget: string;
  duree: string;
}

export default function AppelOffreDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [ao, setAo] = useState<AppelOffreResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [documents, setDocuments] = useState<string[]>([]);
  const [synthese, setSynthese] = useState<Synthese | null>(null);

  // charger AO, documents et synthèse du localStorage
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/appeloffre/${id}`);
        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || 'Erreur de chargement');
        }
        setAo(await res.json());
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();

    // mock persistence
    const docs = JSON.parse(localStorage.getItem(`docs_${id}`) || '[]');
    setDocuments(docs);

    const stored = localStorage.getItem(`synthese_${id}`);
    if (stored) setSynthese(JSON.parse(stored));
  }, [id]);

  const handleAddDocument = () => {
    const name = prompt('Nom du document (ex: CCTP.pdf)')?.trim();
    if (name) {
      const next = [...documents, name];
      setDocuments(next);
      localStorage.setItem(`docs_${id}`, JSON.stringify(next));
    }
  };

  const handleSynthese = () => {
    if (!ao) return;
    const mock: Synthese = {
      dateVisite: new Date().toLocaleDateString(),
      nomClient: ao.nomClient,
      adresseProjet: '123 Rue du Projet, 75000 Paris',
      penalite: 'À définir',
      sujet: 'FCO, CFA, CVC, Plomberie',
      budget: '100 000 €',
      duree: '6 mois',
    };
    setSynthese(mock);
    localStorage.setItem(`synthese_${id}`, JSON.stringify(mock));
  };

  if (loading) {
    return <div className="text-center py-20">Chargement…</div>;
  }
  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <p className="text-red-600 font-semibold">{error}</p>
        <button
          onClick={() => router.push('/dashboard/aoffres')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          ← Retour à la liste
        </button>
      </div>
    );
  }
  if (!ao) {
    return <div className="text-center py-20 text-gray-600">Appel d’offre introuvable.</div>;
  }

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4">
      <button
        onClick={() => router.push('/dashboard/aoffres')}
        className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800 transition"
      >
        ← Retour à la liste
      </button>

      {/* Card principale */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <header className="px-6 py-8 flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{ao.titre}</h1>
            <p className="mt-2 text-sm text-gray-500">
              Publié le {new Date(ao.creeLe).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex flex-wrap gap-3">
            <button
              onClick={() => alert('GO 👌')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Go
            </button>
            <button
              onClick={() => alert('No Go ✋')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              No Go
            </button>
            {/* Modifier */}
            <button
              onClick={() => router.push(`/dashboard/aoffres/${id}/edit`)}
              aria-label="Modifier"
              className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-5-9l5 5M6 18h12"/>
              </svg>
            </button>
            {/* Supprimer */}
            <button
              onClick={() => confirm('Supprimer cet appel d’offre ?') && alert('Supprimé')}
              aria-label="Supprimer"
              className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0h4"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Contenu */}
        <section className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Client</h2>
              <p className="mt-1 text-gray-900">{ao.nomClient}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Date limite</h2>
              <p className="mt-1 text-gray-900">
                {new Date(ao.dateLimite).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Statut</h2>
              <span
                className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${
                  ao.statut === 'En cours'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {ao.statut}
              </span>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="text-gray-900 whitespace-pre-line">{ao.description}</p>
          </div>
        </section>

        {/* Bouton Synthèse dans le bas droit de la card */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            onClick={handleSynthese}
            className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 16h8M8 12h8m-6 8h2a2 2 0 002-2v-3H6v3a2 2 0 002 2zm4-20a9 9 0 100 18 9 9 0 000-18z"/>
            </svg>
            <span>Synthétiser document</span>
          </button>
        </div>
      </div>

      {/* Section Documents */}
      <section className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="flex flex-wrap gap-4">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M7 7h10M7 11h10M7 15h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span>{doc}</span>
            </div>
          ))}
          <button
            onClick={handleAddDocument}
            className="flex items-center justify-center h-10 w-10 bg-gray-200 rounded hover:bg-gray-300 transition"
            aria-label="Ajouter document"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Synthèse générée */}
      {synthese && (
        <section className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Fiche de synthèse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Date de visite:</strong> {synthese.dateVisite}
            </div>
            <div>
              <strong>Nom du client:</strong> {synthese.nomClient}
            </div>
            <div>
              <strong>Adresse du projet:</strong> {synthese.adresseProjet}
            </div>
            <div>
              <strong>Pénalité:</strong> {synthese.penalite}
            </div>
            <div className="md:col-span-2">
              <strong>Sujet:</strong> {synthese.sujet}
            </div>
            <div>
              <strong>Budget estimé:</strong> {synthese.budget}
            </div>
            <div>
              <strong>Durée:</strong> {synthese.duree}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
