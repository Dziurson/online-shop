import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service'
import { Product } from '../model/product';
import { DiscountService } from '../services/discount.service';
import { Discount } from '../model/discount';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  quantity: number;
  discount: Discount = null;
  date: Date;

  constructor(
    private cartService: CartService,
    private discountService: DiscountService) { }

  ngOnInit() {
    this.quantity = 1;
    this.discountService.getDiscountByProductId(this.product.id).subscribe((discount) => {
      this.discount = discount;
    })
  }

  addToCart() {    
    var productToAdd = {...this.product};
    if(this.hasActiveDiscount())
      productToAdd.price = productToAdd.price - this.discount.discountValue;
    this.cartService.addToCart(productToAdd, this.quantity);
    this.quantity = 1;
  }

  showInceraseButton() {
    var productInCart = this.cartService.productsInCart.find(p => p.id == this.product.id);
    if(productInCart)
      return this.quantity < this.product.quantity - productInCart.quantity;
    else
      return this.quantity < this.product.quantity;
  }

  hasActiveDiscount() {
    return this.discount != null && new Date(this.discount.discountTimeout) > new Date(Date.now());
  }

  disableButton() {
    var productInCart = this.cartService.productsInCart.find(p => p.id == this.product.id);
    if(productInCart)
      return this.product.quantity < productInCart.quantity + this.quantity;
    else
      return this.quantity > this.product.quantity;    
  }

}
