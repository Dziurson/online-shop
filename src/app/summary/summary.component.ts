import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  isOrderPlaced: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  getProductsInCart() {
    return this.cartService.productsInCart;
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
