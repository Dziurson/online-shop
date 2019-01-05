import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  order: Order;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.order = this.getOrder();
  } 

  getOrder() {
    return this.cartService.orderData;
  }

  getTotalCartValue() {
    return this.cartService.getCartTotalValue();
  }

  getTotalItemsInCart() {
    return this.cartService.getTotalItemsInCart();
  }

  placeOrder() {
    this.cartService.placeOrder('/products')
  }

}
