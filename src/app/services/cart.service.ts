import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { Order } from '../model/order';
import { ProductService } from './product.service';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  productsInCart: Product[] = [];
  productsInDb: Product[] = [];
  orderData: Order;
  constructor(
    private db: AngularFirestore,
    private nodeService: NodeService,
    private productService: ProductService,
    private router: Router) {

    const savedCart = localStorage.getItem('productsInCart');
    if (savedCart !== null) {
      this.productsInCart = JSON.parse(savedCart);
    }
    const savedOrder = localStorage.getItem('orderData');
    if (savedOrder !== null) {
      this.orderData = JSON.parse(savedOrder);
    }

    this.productService.getProducts().subscribe((products) => {
      this.productsInDb = products;
    })
  }

  addToCart(product: Product, quantity: number) {
    var productToAdd = product;
    product.quantity = quantity;
    var productInCart = this.productsInCart.find(p => p.id == product.id);
    if (productInCart)
      productInCart.quantity = productInCart.quantity + quantity;
    else
      this.productsInCart.push(productToAdd);

    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
  }

  removeFromCart(productId) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if (productIndex != -1)
      this.productsInCart.splice(productIndex, 1);
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
  }

  inceraseQuantity(productId, quantity) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if (productIndex != -1)
      this.productsInCart[productIndex].quantity = this.productsInCart[productIndex].quantity + quantity;
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
  }

  deceraseQuantity(productId, quantity) {
    var productIndex = this.productsInCart.findIndex(p => p.id == productId);
    if (productIndex != -1)
      this.productsInCart[productIndex].quantity = this.productsInCart[productIndex].quantity - quantity;
    localStorage.setItem('productsInCart', JSON.stringify(this.productsInCart));
  }

  getCartTotalValue() {
    return this.productsInCart.map(p => p.quantity * p.price).reduce((prev, curr) => prev + curr, 0);
  }

  getTotalItemsInCart() {
    return this.productsInCart.map(p => p.quantity).reduce((prev, curr) => prev + curr, 0);
  }

  clearCart() {
    this.productsInCart = [];
  }

  clearOrderData() {
    this.orderData = null;
  }

  setOrderData(order) {
    this.orderData = order;
    localStorage.setItem('orderData', JSON.stringify(this.orderData));
  }

  placeOrder(redirectLink) {
    var self = this;
    if (!this.nodeService.useNodeService) {
      var orderIdDocRef = this.db.collection("sequences").doc("order").ref;
      this.db.firestore.runTransaction(transaction => {
        return transaction.get(orderIdDocRef).then(sfDoc => {
          if (!sfDoc.exists) {
            throw "Dokument order w kolekcji sequences nie istnieje";
          }
          var currentOrderId = sfDoc.data().id + 1;
          self.orderData.id = currentOrderId;
          transaction.update(orderIdDocRef, { id: currentOrderId });
        });
      }).then(() => {
        self.db.collection('orders').doc(self.orderData.id.toString()).set(self.orderData).then(() => {
          self.productsInCart.forEach((product) => {
            var dbquantity = self.productsInDb.find(p => p.id == product.id).quantity;
            self.db.collection('products').doc(product.id.toString()).set({ quantity: dbquantity - product.quantity }, { merge: true })
          })
          this.clearCart();
          this.clearOrderData();
          localStorage.removeItem('orderData')
          if (redirectLink)
            this.router.navigate([redirectLink]);
        });
      }).catch(function (error) {
        console.log("Transaction failed: ", error);
      });
    }
    else
      this.nodeService.insertOrder(self.orderData).then(() => {
        if (redirectLink)
            this.router.navigate([redirectLink]);
      });
  }
}
