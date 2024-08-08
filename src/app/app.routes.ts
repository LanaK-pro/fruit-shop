import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  {
    path: '**',
    component: Error404Component,
  },
];
