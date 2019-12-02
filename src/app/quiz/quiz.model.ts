export interface Quiz {
  id?: string;
  naam: string;
  adres: string;
  datum: Date;
  uur: string;
  aantalSpelers: number;
  arno: boolean;
  bart: boolean;
  tim: boolean;
  ward: boolean;
  invallers?: string[];
  opmerkingen?: string;
  behaaldePunten?: number;
  maxPunten?: number;
  positie?: string;
  score?: number;
  link?: string;
}
