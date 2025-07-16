'use client';

import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
     // ➜ Ajout de flex-1 ici pour qu’il grandisse dans le main parent
    <div className="flex flex-1 h-full bg-gray-400">
    <Sidebar/>

      <main className="flex-1 min-w-0 p-8 overflow-y-auto bg-gray-200">
        {children}
      </main>
    </div>
  );
}
