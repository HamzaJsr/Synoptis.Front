import { UserBasicDTO } from "./user";

export interface AppelOffreShortDTO {
  id: string;
  titre: string;
  description: string;
  dateLimite: string;  // ISO date string
  nomClient: string;
  statut: string;
  creeLe: string;      // ISO date string
}



export interface AppelOffreResponseDTO {
  id: string;
  titre: string;
  description: string;
  dateLimite: string;     // on reçoit un ISO, on pourra le convertir en Date plus tard si besoin
  nomClient: string;
  statut: string;
  creeLe: string;
  createdById: string;
  createdBy: UserBasicDTO;
}

