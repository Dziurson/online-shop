import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product';
import { ProductService } from '../../../../../src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

}
