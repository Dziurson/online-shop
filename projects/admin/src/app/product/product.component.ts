import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product'
import { ProductService } from '../../../../../src/app/services/product.service'
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute, 
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    //if(this.authenticationService.isUserLoggedIn() == false)
    //  this.router.navigate(['/login'])
    this.route.params.subscribe(params => {
      const productId = params['product-id'];
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;        
      })
    }); 
    this.adminService.header = 'Panel Administracyjny/Produkty/Szczegóły Produktu'  
  }

  removeProduct() {
    var self = this;
    this.productService.removeProduct(this.product.id).then(() => {
      self.router.navigate(['/panel/products'])
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.product);
  }

}
