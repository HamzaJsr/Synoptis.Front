import { AppelOffreShortDTO } from "./appelOffre";

export interface UserShortDTO {
  id: string;
  nom: string;
  email: string;
  role: string;
}

export interface UserResponseDTO {
  id: string;
  nom: string;
  email: string;
  role?: string | null;
  creeLe: string;
  appelOffres: AppelOffreShortDTO[];
  collaborateurs?: UserShortDTO[];
  responsable?: UserShortDTO;
  collegues?: UserShortDTO[];
}