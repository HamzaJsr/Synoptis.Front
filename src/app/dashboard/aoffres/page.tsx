'use client';

import DashboardCA from '@/components/DashboardCA';
import DashboardRA from '@/components/DashboardRA';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Payload = { role: string; nameid: string };

export default function OffresPage() {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('synoptis_token');
    if (!token) {
      router.push('/login');
      return;
    }
    const { role, nameid } = jwtDecode<Payload>(token);
    setRole(role);
    setUserId(nameid);
    setLoading(false);
  }, [router]);

  if (loading) {
    return <div>Chargement…</div>;
  }

  if (role === 'ResponsableAgence') {
    return <DashboardRA userId={userId!} />;
  }

  if (role === 'ChargeAffaires' || role === 'Secretaire') {
    return <DashboardCA userId={userId!} />;
  }

  router.push('/login');
  return null;
}
