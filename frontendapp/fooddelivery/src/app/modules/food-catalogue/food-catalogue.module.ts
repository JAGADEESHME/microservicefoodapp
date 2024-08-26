import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodCatalogueRoutingModule } from './food-catalogue-routing.module';
import { FoodCatalogueComponent } from './food-catalogue/food-catalogue.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FoodCatalogueRoutingModule,
    FoodCatalogueComponent
  ]
})
export class FoodCatalogueModule { }
