import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './modules/header/header/header.component';
import { RestaurantListingComponent } from './modules/restaurant-listing/restaurant-listing/restaurant-listing.component';
import { FoodCatalogueComponent } from './modules/food-catalogue/food-catalogue/food-catalogue.component';
import { OrderSummaryComponent } from './modules/order-summary/component/order-summary/order-summary.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink,HeaderComponent,FoodCatalogueComponent,RestaurantListingComponent,OrderSummaryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fooddelivery';
}
