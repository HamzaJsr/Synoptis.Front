// src/app/api/appeloffre/[userId]/route.ts
import { AppelOffreShortDTO, UserShortDTO } from '@/types';
import { NextResponse } from 'next/server';


//Route pour la creation d'ao
export async function POST(
  request: Request, {params}: {params: {userId: string}}
) {
  const { userId } = params;
  const body = await request.json();               // { titre, nomClient, description, dateLimite }
//   const auth = request.headers.get('authorization') ?? '';

  // On relaie vers ton back .NET
  const res = await fetch(`http://localhost:5268/AppelOffre/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    //   Authorization: auth,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  // On renvoie le même JSON et le même code HTTP
  return NextResponse.json(data, { status: res.status });
}

// Route pour le dashboard RA
export async function GET(request:Request, {params}: {params: {userId: string}}){
  const {userId} = await params;
  const res = await fetch(`http://192.168.1.182:5268/user/${userId}`);
    const data = await res.json() as {
      collaborateurs: UserShortDTO[];
      appelOffres: AppelOffreShortDTO[];
    };
  return NextResponse.json(data, { status: res.status });
}




      