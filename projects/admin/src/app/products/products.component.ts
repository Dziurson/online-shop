import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product';
import { ProductService } from '../../../../../src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  
  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == false)
      this.router.navigate(['/login'])
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
    });
  }

}
