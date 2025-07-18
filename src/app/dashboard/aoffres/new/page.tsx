'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

type Payload = { nameid: string; role: string };

export default function NewAppelOffrePage() {
  const [titre, setTitre] = useState('');
  const [nomClient, setNomClient] = useState('');
  const [description, setDescription] = useState('');
  const [dateLimite, setDateLimite] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Récupérer userId depuis le JWT
    const token = localStorage.getItem('synoptis_token')!;
    const { nameid: userId } = jwtDecode<Payload>(token);

    try {
      const res = await fetch(`/api/appeloffre/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titre, nomClient, description, dateLimite }),
      });
      const { data, message, errorMessage } = await res.json();

      if (!res.ok) {
        throw new Error(errorMessage || 'Erreur création');
      } 

      // Succès → on affiche alert
      toast.success('Création réussie 🎉');

   setTimeout(() => {
    router.push('/dashboard/aoffres');
  }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">+ Nouvel appel d’offre</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Titre"
          value={titre}
          onChange={e => setTitre(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Nom du client"
          value={nomClient}
          onChange={e => setNomClient(e.target.value)}
          required
          className="w-full p-2 border rounded"
          disabled={loading}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-32"
          disabled={loading}
        />
        <label className="block">
          <span>Date limite</span>
          <input
            type="date"
            value={dateLimite}
            onChange={e => setDateLimite(e.target.value)}
            required
            className="w-full p-2 border rounded"
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded font-medium ${
            loading
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          {loading ? 'Envoi…' : 'Créer'}
        </button>
      </form>
    </div>
  );
}
