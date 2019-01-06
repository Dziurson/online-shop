import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

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

  setOrderState(orderId: string, state: string) {
    return this.db.collection('orders').doc(orderId.toString()).set({
      status: state,
    }, { 
      merge: true 
    }).then(() => {
      console.log("Zaktualizowano status dokumentu");
    })
  }
}
