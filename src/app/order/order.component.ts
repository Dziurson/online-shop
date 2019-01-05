import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Order } from '../model/order'
import { Router } from '@angular/router'
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order;
  constructor(
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {
    this.order = this.cartService.orderData;
    if(!this.order)
      this.order = {
        id: '-1', 
        name: '',
        city: '',
        mail: '',
        phone: '',
        products: this.cartService.productsInCart,
        surname: '',
        zipCode: '',
        status: 'new'
      }    
  }

  saveOrderData() {
    this.cartService.setOrderData(this.order);
    this.router.navigate(['/summary']);
  }
}
