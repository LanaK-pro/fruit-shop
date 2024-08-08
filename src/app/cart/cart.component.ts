import { Component, inject } from '@angular/core';
import { ProduitService } from '../../shared/services/produit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  //Donné du mock qui était un observable dans le service
  products$ = inject(ProduitService).fetchAllFruits();
}
