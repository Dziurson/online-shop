import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product'
import { ProductService } from '../../../../../src/app/services/product.service'
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { Discount } from 'src/app/model/discount';
import { DiscountService } from 'src/app/services/discount.service';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;
  categories: Category[];
  discount: Discount = null;
  selectedCategoryName: string;

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private discountService: DiscountService,
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
        this.discountService.getDiscountByProductId(productId).subscribe((discount) => {
          this.discount = discount;
          if(this.discount == null)
          this.discount = { 
            id: '-1', 
            discountValue: 0, 
            productId: this.product.id, 
            discountTimeout: null 
          }; 
        });
        this.productService.getCategories().subscribe((categories) => {
          this.categories = categories;
          this.selectedCategoryName = categories.find(c => c.id == this.product.categoryId).name;
        })             
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
    this.product.categoryId = this.categories.find(c => c.name == this.selectedCategoryName).id;
    this.productService.updateProduct(this.product);
    if(this.discount.discountValue != 0 && this.discount.discountTimeout != null)
      this.discountService.insertDiscount(this.discount);
  }

}
