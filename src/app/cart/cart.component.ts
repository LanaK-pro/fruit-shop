import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { CommonModule } from '@angular/common';
import { IProduit } from '../../shared/entities';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ProductListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  @Input() cartProduits: IProduit[] = [];
  @Output() removeItem = new EventEmitter<IProduit>();

  private taxRate = 0.2; // 20% de TVA

  calculateProductHT(product: IProduit): number {
    return product.prixHT * product.quantite;
  }

  get totalQuantity(): number {
    return this.cartProduits.reduce(
      (total, product) => total + product.quantite,
      0,
    );
  }

  get totalPriceHT(): number {
    return this.cartProduits.reduce(
      (total, product) => total + product.prixHT * product.quantite,
      0,
    );
  }

  get totalPriceTTC(): number {
    return this.totalPriceHT * (1 + this.taxRate);
  }

  //Pour definitivement supprimé le produit du cart
  onRemoveItem(product: IProduit) {
    this.cartProduits = this.cartProduits.filter((p) => p.id !== product.id);
    this.removeItem.emit(product);
  }
}
