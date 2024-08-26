import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';


export const routes: Routes = [{
    path: 'test', component:TestComponent
},
{
    path: 'header',
    loadChildren: () => import('./modules/header/header.module').then(m => m.HeaderModule)
  },
  {
    path: 'header1',
    loadComponent: () => import('./modules/header/header/header.component').then(m => m.HeaderComponent)
  },
  { path: '', redirectTo: 'restaurant-listing', pathMatch: 'full' },

  { path: 'restaurant-listing',  loadComponent: () => import('./modules/restaurant-listing/restaurant-listing/restaurant-listing.component').then(m => m.RestaurantListingComponent)},
  

 
  { path: 'food-catalogue/:id',  loadComponent: () => import('./modules/food-catalogue/food-catalogue/food-catalogue.component').then(m => m.FoodCatalogueComponent)},
  
  { path: 'orderSummary',  loadComponent: () => import('./modules/order-summary/component/order-summary/order-summary.component').then(m => m.OrderSummaryComponent)},
];
