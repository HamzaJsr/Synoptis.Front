import { AppelOffreShortDTO, UserShortDTO } from '@/types';
import { NextResponse } from 'next/server';


export async function GET(request:Request, {params}: {params: {userId: string}}){
  const {userId} = await params;
  const res = await fetch(`http://192.168.1.182:5268/user/${userId}`);
    const data = await res.json() as {
      collaborateurs: UserShortDTO[];
      appelOffres: AppelOffreShortDTO[];
    };
  return NextResponse.json(data, { status: res.status });
}




      
          