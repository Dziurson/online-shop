import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product'
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute, 
    private productService: ProductService) { }

  ngOnInit() {
    var productId = this.route.snapshot.paramMap.get('product-id');
    this.product = this.productService.getProduct(productId);
  }

  addToCart() {    
    this.cartService.addToCart({...this.product},1);
  }

}
