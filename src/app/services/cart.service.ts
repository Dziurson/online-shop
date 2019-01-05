import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: Product[] = [];
  orderData: Order;
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

  removeFromCart(productId) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if(productIndex != -1)
      this.productsInCart.splice(productIndex,1);
  }

  inceraseQuantity(productId, quantity) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if(productIndex != -1)
      this.productsInCart[productIndex].quantity = this.productsInCart[productIndex].quantity + quantity;
  }

  deceraseQuantity(productId, quantity) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if(productIndex != -1)
      this.productsInCart[productIndex].quantity = this.productsInCart[productIndex].quantity - quantity;
  }

  getCartTotalValue() {
    return this.productsInCart.map(p => p.quantity * p.price).reduce((prev, curr) => prev + curr, 0);
  }

  getTotalItemsInCart() {
    return this.productsInCart.map(p => p.quantity).reduce((prev, curr) => prev + curr, 0);
  }

  setOrderData(order) {
    this.orderData = order;
  }

  getOrderData() {
    return this.orderData;
  }

  clearCart() {
    this.productsInCart = [];
  }

  clearOrderData() {
    this.setOrderData(null);
  }
}
