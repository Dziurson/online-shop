import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product'
import { ProductService } from '../services/product.service'
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  quantity: number;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute, 
    private productService: ProductService) { }

  ngOnInit() {    
    var productId = this.route.snapshot.paramMap.get('product-id');    
    this.productService.getProduct(productId).subscribe((product) => {
      this.product = product;
      this.productService.setVisited(this.product);
    }) 
    this.quantity = 1;
  }

  addToCart() {    
    this.cartService.addToCart({...this.product}, this.quantity);
    this.quantity = 1;
  }

  showInceraseButton() {
    if(this.product != null) {
      var productInCart = this.cartService.productsInCart.find(p => p.id == this.product.id);
      if(productInCart)
        return this.quantity < this.product.quantity - productInCart.quantity;
      else
        return this.quantity < this.product.quantity;
      }
  }

}
