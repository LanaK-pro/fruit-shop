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
    // Crée une copie a envoyer
    const cartItem: IProduit = { ...product, quantite: product.quantite };

    // Trouver l'index on compare les ids
    const existingProductIndex = this.cartProduits.findIndex(
      (item) => item.id === cartItem.id,
    );

    if (existingProductIndex !== -1) {
      // Si le produit existe j'aditionne juste
      this.cartProduits[existingProductIndex].quantite += cartItem.quantite;
    } else {
      // Sinon j'ajoute
      this.cartProduits.push(cartItem);
    }

    this.cartUpdated.emit(this.cartProduits);

    // Reset la quantité affiché
    product.quantite = 0;

    console.log('Produit ajouté au panier :', cartItem);
  }
}
