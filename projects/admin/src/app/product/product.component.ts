import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../src/app/model/product'
import { ProductService } from '../../../../../src/app/services/product.service'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product;

  constructor(private route: ActivatedRoute, 
    private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['product-id'];
      this.productService.getProduct(productId).subscribe((product) => {
        this.product = product;        
      })
    });   
  }

}
