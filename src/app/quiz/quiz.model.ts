export interface Quiz {
  id?: string;
  naam: string;
  adres: string;
  datum: any;
  uur: string;
  aantalSpelers: number;
  arno: any;
  bart: any;
  tim: any;
  ward: any;
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
