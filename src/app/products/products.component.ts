import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  constructor(private productService: ProductService) { 
    
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }
}
