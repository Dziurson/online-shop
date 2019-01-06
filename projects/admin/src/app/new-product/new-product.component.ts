import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Product } from '../../../../../src/app/model/product';
import { ProductService } from '../../../../../src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  product: Product;
  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == false)
      this.router.navigate(['/login'])
    this.product = {id: '-1', name: "", desc: " ", price: 0, quantity: 0, imageSource: "" };    
  }

  insertProduct() {
    this.productService.insertProduct(this.product, "http://localhost:4201/panel/products"); 
  }

}
