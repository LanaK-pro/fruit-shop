import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { Error404Component } from './error404/error404.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  //Si tu veux check mes components un par un
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  {
    path: '**',
    component: Error404Component,
  },
];
