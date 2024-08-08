import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { IProduit } from '../shared/entities';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ProductListComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'fruit-shop';

  cartProduits: IProduit[] = [];

  updateCart(items: IProduit[]) {
    this.cartProduits = items;
  }

  removeFromCart(product: IProduit) {
    this.cartProduits = this.cartProduits.filter(
      (item) => item.id !== product.id,
    );
  }
}
