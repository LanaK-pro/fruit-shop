import { Injectable } from '@angular/core';
import { mockFruit } from '../mockFruits';
import { Observable, of } from 'rxjs';
import { IProduit } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  constructor() {}

  //Un observable pour recuperé les données du mock plus rapidement et simplement
  fetchAllFruits(): Observable<IProduit[]> {
    return of(mockFruit as IProduit[]);
  }
}
