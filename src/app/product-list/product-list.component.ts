import { Component, EventEmitter, Output, Pipe, inject } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { CommonModule } from '@angular/common';
import { IProduit } from '../../shared/entities';
import { Observable } from 'rxjs';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //Pour envoyer le tableau de produits au panier Cart
  @Output() cartUpdated = new EventEmitter<IProduit[]>();
  cartProduits: IProduit[] = [];

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

  addToCart(product: IProduit) {
    this.updateCart(product);
    product.quantite = 0;
  }

  onRemoveItem(product: IProduit) {
    this.cartProduits = this.cartProduits.filter((p) => p.id !== product.id);
    this.cartUpdated.emit(this.cartProduits);
  }

  updateCart(product: IProduit) {
    const index = this.cartProduits.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      this.cartProduits[index].quantite += product.quantite;
    } else {
      this.cartProduits.push(product);
    }

    this.cartUpdated.emit(this.cartProduits);
  }
}
