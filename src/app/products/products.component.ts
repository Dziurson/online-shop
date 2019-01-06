import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { ProductService } from '../services/product.service'
import { Category, CategoryClient } from '../model/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  filteredProductList: Product[] = [];
  categories: CategoryClient[] = [];  
  searchString: string = null;
  constructor(private productService: ProductService) { 
    
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;   
      this.filteredProductList = this.productList;   
    });
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories.map(c => ({id: c.id, name: c.name, checked: false}));    
    })
  }

  filter() { 
    var anyCategorySelected = this.categories.map(c => c.checked).reduce((prev,curr) => {return prev = prev || curr}, false);
    this.filteredProductList = this.productList;
    if(this.searchString)     
      this.filteredProductList = this.filteredProductList.filter(p => p.name.startsWith(this.searchString))   
    if(anyCategorySelected)
      this.filteredProductList = this.filteredProductList.filter(p => this.categories.filter(c => c.checked).map(c => c.id).includes(p.categoryId));     
  }
}
