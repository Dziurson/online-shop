import { CartService } from './services/cart.service'
import { Component } from '@angular/core';
import { Product } from './model/product';
import { ProductService } from './services/product.service';
import { NodeService } from './services/node.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private nodeService: NodeService) {
      this.nodeService.connect();
    }
  title = 'online-shop';

  getTotalCartValue() {
    return this.cartService.getCartTotalValue();
  }

  getTotalItemsInCart() {
    return this.cartService.getTotalItemsInCart();
  }
}
