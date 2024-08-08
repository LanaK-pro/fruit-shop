export interface IProduit {
  id: number;
  nom: string;
  image: string;
  prixHT: number;
  quantite: number;
}

export interface Icart {
  id: number;
  nom: string;
  prixHT: number;
  quantite: number;
}
