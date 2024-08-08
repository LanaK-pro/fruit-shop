import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';
import { IProduit, Icart } from '../../shared/entities';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cartItems: Icart[] = [];

  // Le nouveau panier
  updateCart(products: IProduit[]): void {
    this.cartItems = products.map((product) => ({
      id: product.id,
      nom: product.nom,
      prixHT: product.prixHT,
      quantite: product.quantite,
    }));
  }

  onRemoveItemFromCart(cartItem: Icart) {
    this.cartItems = this.cartItems.filter((item) => item.id !== cartItem.id);
  }
}
