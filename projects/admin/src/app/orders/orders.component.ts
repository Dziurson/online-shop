import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../src/app/model/order';
import { OrderService } from '../../../../../src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders) => {
      this.orderList = orders;
    });
  }

  getOrderTotalValue(order: Order) {
    return order.products.map(p => p.price * p.quantity).reduce((prev, curr) => { return prev = prev + curr },0);
  }

}
