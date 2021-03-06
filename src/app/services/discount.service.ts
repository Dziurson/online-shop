import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Discount } from '../model/discount';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(
    private db: AngularFirestore,
    private nodeService: NodeService) { }

  getDiscountByProductId(productId) {    
    return this.getDiscounts().pipe(map(p => p.find(p => p.productId == productId)))    
  }

  getDiscounts(): Observable<Discount[]> {
    if (!this.nodeService.useNodeService) {
      let discounts: AngularFirestoreCollection<Discount> = this.db.collection('discounts')
      return discounts
        .snapshotChanges()
        .pipe(map((changes) =>
          changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
    }
    else
      return this.nodeService.getDiscounts().pipe(map((changes) =>
        changes.map((discount: any) => ({ id: discount._id, ...discount }))));
  }

  insertDiscount(discount) {
    var self = this;
    if (!this.nodeService.useNodeService) {
      if (discount.id != '-1') {
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
    else
      return this.nodeService.insertDiscount(discount);
  }

  removeDiscount(discount) {
    if (!this.nodeService.useNodeService)
      this.db.collection('discounts').doc(discount.id.toString()).delete();
    else
      this.nodeService.removeDiscount(discount.id);
  }
}
