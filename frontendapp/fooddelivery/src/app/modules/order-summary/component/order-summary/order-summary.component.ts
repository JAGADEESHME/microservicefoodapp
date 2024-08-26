import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../../models/OrderDTO';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit {

  orderSummary?: OrderDTO | undefined;
  obj: any;
  total?: any;
  showDialog: boolean = false;

  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }
  
  ngOnInit() {
    const data = this.route.snapshot.queryParams['data'];
    console.log("order summary data:: " + data)
    this.obj = JSON.parse(data);
    this.obj.userId=1;
    this.orderSummary = this.obj;

    this.total = this.orderSummary?.foodItemsList?.reduce((accumulator, currentValue) => {
      const quantity = currentValue.quantity ?? 0;
      const price = currentValue.price ?? 0;
      return accumulator + (quantity * price);
    }, 0);


    // this.total = this.orderSummary.foodItemsList.reduce((accumulator, currentValue) => {
    //   return accumulator + (currentValue.quantity * currentValue.price);
    // }, 0);

  }

  saveOrder() {
    this.orderService.saveOrder(this.orderSummary)
      .subscribe(
        response => {
            this.showDialog = true;
        },
        error => {
          console.error('Failed to save data:', error);
        }
      );
  }

  closeDialog() {
    this.showDialog = false;
    this.router.navigate(['/']); // Replace '/home' with the actual route for your home page
  }


}
