import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: Product[] = [];
  constructor() { }

  addToCart(product: Product, quantity: number) {
    var productToAdd = product;
    product.quantity = quantity;
    var productInCart = this.productsInCart.find(p => p.id == product.id);
    if(productInCart)
      productInCart.quantity = productInCart.quantity + quantity;
    else
      this.productsInCart.push(productToAdd);
  }
}
