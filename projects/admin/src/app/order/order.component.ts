import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../src/app/model/order';
import { OrderService } from '../../../../../src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const orderId = params['order-id'];
      this.orderService.getOrder(orderId).subscribe((order) => {
        this.order = order;        
      })
    }); 
  }

}
