import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product';
import { ProductService } from '../../../../../src/app/services/product.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: Product;
  constructor(
    private productService: ProductService,
    private router:Router) { }

  ngOnInit() {
    this.product = {id: '-1', name: "", desc: " ", price: 0, quantity: 0, imageSource: "" };    
  }

  insertProduct() {
    this.productService.insertProduct(this.product, "http://localhost:4201/panel/products"); 
  }

}
