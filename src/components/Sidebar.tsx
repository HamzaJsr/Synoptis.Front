import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Tableau de bord</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/dashboard/aoffres" className="text-gray-700 hover:text-blue-600">
          Appels d'offres
        </Link>
        <Link href="/dashboard/equipe" className="text-gray-700 hover:text-blue-600">
          Mon équipe
        </Link>
        <Link href="/dashboard/parametres" className="text-gray-700 hover:text-blue-600">
          Paramètres
        </Link>
      </nav>
    </aside>
  );
}
