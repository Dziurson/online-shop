import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Discount } from '../model/discount';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private db: AngularFirestore) { }

  getDiscountByProductId(productId) {
    return this.getDiscounts().pipe(map(p => p.find(p => p.productId == productId)))
  }

  getDiscounts(): Observable<Discount[]> {
    let discounts: AngularFirestoreCollection<Discount> = this.db.collection('discounts')
    return discounts
      .snapshotChanges()
      .pipe(map((changes) =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  insertDiscount(discount) {
    var self = this;
    if(discount.id != '-1') {
      return this.db.collection("discounts").doc(discount.id.toString()).set(discount);
    }
    var discountDocRef = this.db.collection("sequences").doc("discount").ref;
    this.db.firestore.runTransaction(transaction => {
      return transaction.get(discountDocRef).then(sfDoc => {
        if (!sfDoc.exists) {
          throw "Dokument produkt w kolekcji sequences nie istnieje";
        }
        var currentDiscountId = sfDoc.data().id + 1;
        discount.id = currentDiscountId; 
        transaction.update(discountDocRef, { id: currentDiscountId });
      });
    }).then(() => {
      return self.db.collection('discounts').doc(discount.id.toString()).set(discount);
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
    });    
  }

  removeDiscount(discount) {
    this.db.collection('discounts').doc(discount.id.toString()).delete();
  }
}
