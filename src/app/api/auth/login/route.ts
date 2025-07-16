
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, motDePasse } = await request.json();
  const res = await fetch('http://localhost:5268/Auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, motDePasse }),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
