import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CartComponent } from '../cart/cart.component';
import { IProduit } from '../../shared/entities';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductListComponent, CartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  cartProduits: IProduit[] = [];

  updateCart(items: IProduit[]) {
    this.cartProduits = items;
  }

  onRemoveItem(product: IProduit) {
    this.cartProduits = this.cartProduits.filter((p) => p.id !== product.id);
  }
}
