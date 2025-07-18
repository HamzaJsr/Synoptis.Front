'use client';

import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
     // ➜ Ajout de flex-1 ici pour qu’il grandisse dans le main parent
    <div className="flex flex-1 h-full bg-gray-400">
    <Sidebar/>

      <main className="flex-1 min-w-0 p-8 overflow-y-auto bg-gray-200">
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </main>
    </div>
  );
}
