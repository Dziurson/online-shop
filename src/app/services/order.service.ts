import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../model/order';
import { ProductService } from './product.service';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  productsFromDb: Product[] = [];

  constructor(private productService: ProductService,
    private db: AngularFirestore) { 
      this.productService.getProducts().subscribe((products) => {
        this.productsFromDb = products;
      })
    }

  getOrders(): Observable<Order[]> {
    let products: AngularFirestoreCollection<Order> = this.db.collection('orders')
    return products
      .snapshotChanges()
      .pipe(map((changes) =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  getOrder(orderId: string) {
    return this.getOrders().pipe(map(o => o.find(o => o.id == orderId)))
  }

  setOrderState(order: Order, state: string) {
    return this.db.collection('orders').doc(order.id.toString()).set({
      status: state,
    }, { 
      merge: true 
    }).then(() => {
      if(state=='Odrzucone')
        order.products.forEach((product) => {
          var quantityFromDb = this.productsFromDb.find(p => p.id == product.id).quantity
          this.db.collection('products').doc(product.id).set({quantity: product.quantity + quantityFromDb},{merge: true})
        })
      console.log("Zaktualizowano status dokumentu");
    })
  }
}
