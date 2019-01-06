import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../src/app/model/order';
import { OrderService } from '../../../../../src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: Order[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == false)
      this.router.navigate(['/login'])

    this.orderService.getOrders().subscribe((orders) => {
      this.orderList = orders;
    });
  }

  getOrderTotalValue(order: Order) {
    return order.products.map(p => p.price * p.quantity).reduce((prev, curr) => { return prev = prev + curr },0);
  }

}
