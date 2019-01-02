import { Component } from '@angular/core';
import { Product } from './model/product';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private productService: ProductService) {}
  title = 'online-shop';
}
