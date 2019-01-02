import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  quantity: number

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.quantity = 1;
  }

  addToCart() {    
    this.cartService.addToCart({...this.product}, this.quantity);
    this.quantity = 1;
  }

  showInceraseButton() {
    var productInCart = this.cartService.productsInCart.find(p => p.id == this.product.id);
    if(productInCart)
      return this.quantity < this.product.quantity - productInCart.quantity;
    else
      return this.quantity < this.product.quantity;
  }

}
