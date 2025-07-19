// src/app/api/appeloffre/[Id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request, {params}: {params: {id: string}}
) {
  const { id } = await params;

  // On relaie vers ton back .NET
  const res = await fetch(`http://localhost:5268/AppelOffre/${id}`);

  const data = await res.json();
  // On renvoie le même JSON et le même code HTTP
  return NextResponse.json(data, { status: res.status });
}
