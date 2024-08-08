import { Component, Pipe, inject } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { CommonModule } from '@angular/common';
import { IProduit } from '../../shared/entities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //Inject un observable du mock et avec la fonction du service, peu comme une nouvel instance de Iproduit
  products$: Observable<IProduit[]> = inject(ProduitService).fetchAllFruits();

  //Ajoute
  incrementQuantite(product: IProduit) {
    //Si la valeur de départ de la quantité est zéro ou null, le premier ajout sera donc 1
    product.quantite = (product.quantite || 0) + 1;
  }

  decrementQuantite(product: IProduit) {
    if (product.quantite > 0) {
      product.quantite -= 1;
    }
  }
}
