import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router, RouterModule } from '@angular/router';
import { FoodCataloguePage } from '../../../Shared/models/FoodCataloguePage';
import { FoodItem } from '../../../Shared/models/FoodItem';
import { FooditemService } from '../service/fooditem.service';

@Component({
  selector: 'app-food-catalogue',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css'] // Corrected from styleUrl to styleUrls
})
export class FoodCatalogueComponent implements OnInit {

  restaurantId: number | null = null;
  foodItemResponse: FoodCataloguePage | undefined;
  foodItemCart: FoodItem[] = [];
  orderSummary: FoodCataloguePage | undefined;
  isAnyItemDisabled: boolean = false;
  

  constructor(
    private route: ActivatedRoute,
    private foodItemService: FooditemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.restaurantId = id ? +id : null;
      console.log("inside fc sevice"+id);
      if (this.restaurantId !== null) {
        this.getFoodItemsByRestaurant(this.restaurantId);
      }
    });
  }

  getFoodItemsByRestaurant(restaurantId: number): void {
    this.foodItemService.getFoodItemsByRestaurant(restaurantId).subscribe(
      data => {
        if (data && data.foodItemsList) {
          // Initialize quantity to 0 for each food item and set the isDisabled flag
          data.foodItemsList.forEach((item: FoodItem) => {
            item.quantity = item.quantity ?? 0;
            item.isDisabled = item.quantity <= 0;
          });
          // Recalculate the isAnyItemDisabled flag
          this.isAnyItemDisabled = data.foodItemsList.some((item: FoodItem) => item.isDisabled);
        }
        this.foodItemResponse = data;
        console.log(this.foodItemResponse);
      }
    );
  }

  increment(food: FoodItem): void {
    food.quantity++;
    food.isDisabled = food.quantity <= 0;

    const index = this.foodItemCart.findIndex(item => item.id === food.id);
    if (index === -1) {
      this.foodItemCart.push(food);
    } else {
      this.foodItemCart[index] = food;
    }
    if (this.foodItemResponse?.foodItemsList) {
      this.isAnyItemDisabled = this.foodItemResponse.foodItemsList.some((item: FoodItem) => item.isDisabled);
    } else {
      this.isAnyItemDisabled = false;
    }
  }

  decrement(food: FoodItem): void {
    if (food.quantity > 0) {
      food.quantity--;
      food.isDisabled = food.quantity <= 0;

      const index = this.foodItemCart.findIndex(item => item.id === food.id);
      if (this.foodItemCart[index].quantity === 0) {
        this.foodItemCart.splice(index, 1);
      } else {
        // If record exists, update it in the array
        this.foodItemCart[index] = food;
      }

      // Recalculate the isAnyItemDisabled flag
      if (this.foodItemResponse?.foodItemsList) {
        this.isAnyItemDisabled = this.foodItemResponse.foodItemsList.some((item: FoodItem) => item.isDisabled);
      } else {
        this.isAnyItemDisabled = false;
      }
    }
  }

  onCheckOut(): void {
    if (this.foodItemResponse && this.foodItemResponse.restaurant) {
      this.orderSummary = {
        foodItemsList: this.foodItemCart,
        restaurant: this.foodItemResponse.restaurant
      };
      this.router.navigate(['/orderSummary'], { queryParams: { data: JSON.stringify(this.orderSummary) } });   
      // const extras: NavigationExtras = {
      //   queryParams: {
      //     data: JSON.stringify(this.orderSummary)
      //   }
      // };
      // this.router.navigate(['orderSummary'], extras);
   
    } else {
      console.error('Restaurant data is not available.');
    }
  }
}
