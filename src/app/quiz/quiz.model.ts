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
  aantalSpelersAanwezig?: number;
  opmerkingen?: string;
  behaaldePunten?: number;
  maxPunten?: number;
  positie?: number;
  aantalPloegen?: number;
  score?: number;
  link?: string;
}
