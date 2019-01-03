import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productDatabaseList: Product[]  = [];

  constructor(private cartService: CartService,
    private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.productDatabaseList = products;
    })
  }

  removeFromCart(productId){
    this.cartService.removeFromCart(productId)
  }

  inceraseQuantity(productId, quantity) {
    this.cartService.inceraseQuantity(productId,quantity);
  }

  deceraseQuantity(productId, quantity) {
    this.cartService.deceraseQuantity(productId,quantity);
  }

  showInceraseButton(product) {
    var dbProduct = this.productDatabaseList.find(p => p.id == product.id)
    return dbProduct ? product.quantity < this.productDatabaseList.find(p => p.id == product.id).quantity : false;   
  }

}
