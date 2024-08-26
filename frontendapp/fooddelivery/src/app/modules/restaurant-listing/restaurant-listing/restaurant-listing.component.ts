import { Component,inject, OnInit } from '@angular/core';
import { Restaurant } from '../../../Shared/models/Restaurant';
import { Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../restaurant/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-restaurant-listing',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './restaurant-listing.component.html',
  styleUrl: './restaurant-listing.component.css'
})
export class RestaurantListingComponent implements OnInit{

  public restaurantList: Restaurant[] = [];

  

  constructor(private router : Router,private restaurantService: RestaurantService){}

  ngOnInit() {
    this.getAllRestaurants();
  }


  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      data => {
        this.restaurantList = data;
      }
    )
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  getRandomImage(): string {
    const imageCount = 8; // Adjust this number based on the number of images in your asset folder
    const randomIndex = this.getRandomNumber(1, imageCount);
    return `${randomIndex}.jpg`; // Replace with your image filename pattern
  }

 onButtonClick(id: any) {
  console.log("id    "+id);
  this.router.navigate(['/food-catalogue', id]);
   //this.router.navigateByUrl('/food-catalogue');
   
 }

}
