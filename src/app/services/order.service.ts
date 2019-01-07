import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { ProductService } from './product.service';
import { Product } from '../model/product';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  productsFromDb: Product[] = [];

  constructor(
    private nodeService: NodeService,
    private productService: ProductService,
    private db: AngularFirestore) {
    this.productService.getProducts().subscribe((products) => {
      this.productsFromDb = products;
    })
  }

  getOrders(): Observable<Order[]> {
    if (!this.nodeService.useNodeService) {
      let products: AngularFirestoreCollection<Order> = this.db.collection('orders')
      return products
        .snapshotChanges()
        .pipe(map((changes) =>
          changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
    }
    else
      return this.nodeService.getOrders().pipe(map((changes) =>
        changes.map((order: any) => ({ id: order._id, ...order }))));
  }

  getOrder(orderId: string) {
    if (!this.nodeService.useNodeService)
      return this.getOrders().pipe(map(o => o.find(o => o.id == orderId)))
    else
      return this.nodeService.getOrder(orderId).pipe(map(product => ({ id: product._id, ...product })));
  }

  setOrderState(order: Order, state: string) {
    if (!this.nodeService.useNodeService) {
      return this.db.collection('orders').doc(order.id.toString()).set({
        status: state,
      }, {
          merge: true
        }).then(() => {
          if (state == 'Odrzucone')
            order.products.forEach((product) => {
              var quantityFromDb = this.productsFromDb.find(p => p.id == product.id).quantity
              this.db.collection('products').doc(product.id.toString()).set({ quantity: product.quantity + quantityFromDb }, { merge: true })
            })
          console.log("Zaktualizowano status dokumentu");
        })
    }
    else {
      var tmp = {...order};
      tmp.status = state;
      return this.nodeService.updateOrder(order.id,order);
    }
  }
}
