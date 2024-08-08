import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { CommonModule } from '@angular/common';
import { IProduit, Icart } from '../../shared/entities';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() cartIndependantProduits: Icart[] = []; // Receives cart items with specific properties
  @Output() removeItem = new EventEmitter<Icart>();

  private taxRate = 0.2; // 20% de TVA

  calculateProductHT(product: Icart): number {
    return product.prixHT * product.quantite;
  }

  get totalQuantity(): number {
    return this.cartIndependantProduits.reduce(
      (total, product) => total + product.quantite,
      0,
    );
  }

  get totalPriceHT(): number {
    return this.cartIndependantProduits.reduce(
      (total, product) => total + product.prixHT * product.quantite,
      0,
    );
  }

  get totalPriceTTC(): number {
    return this.totalPriceHT * (1 + this.taxRate);
  }

  //Pour definitivement supprimé le produit du cart
  onRemoveItem(product: Icart) {
    this.cartIndependantProduits = this.cartIndependantProduits.filter(
      (p) => p.id !== product.id,
    );
    console.log('Produit supprimé du panier:', product);
    this.removeItem.emit(product);
  }
}
