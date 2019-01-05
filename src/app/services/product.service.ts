import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { getProduct } from '../mock/mocks';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  lastVisited: Product[] = [];
  constructor(private db: AngularFirestore) { 
    const savedLastVisited = localStorage.getItem('lastVisited'); 
    if(savedLastVisited)
      this.lastVisited = JSON.parse(savedLastVisited);
  }

  getProduct(productId: string) {
    return this.getProducts().pipe(map(p => p.find(p => p.id == productId)))
  }

  getProducts(): Observable<Product[]> {
    let products: AngularFirestoreCollection<Product> = this.db.collection('products')
    return products
      .snapshotChanges()
      .pipe(map((changes) =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }

  insertProduct(product, redirectlink = null) {
    var self = this;
    var productIdDocRef = this.db.collection("sequences").doc("product").ref;
    this.db.firestore.runTransaction(transaction => {
      return transaction.get(productIdDocRef).then(sfDoc => {
        if (!sfDoc.exists) {
          throw "Dokument produkt w kolekcji sequences nie istnieje";
        }
        var currentProductId = sfDoc.data().id + 1;
        product.id = currentProductId; 
        transaction.update(productIdDocRef, { id: currentProductId });
      });
    }).then(() => {
      self.db.collection('products').add(product).then(() =>{
        if(redirectlink)
        window.location.href = redirectlink;
      });       
    }).catch(function (error) {
      console.log("Transaction failed: ", error);
    });    
  }

  removeProduct() {

  }

  setVisited(product: Product) {
    if (this.lastVisited.length == 10) {
      this.lastVisited.splice(0, 1);
    }
    var current = this.lastVisited.findIndex(p => p.id == product.id);
    if(current != -1)
      this.lastVisited.splice(current,1);
    this.lastVisited.push(product);
    localStorage.setItem('lastVisited', JSON.stringify(this.lastVisited));
  }
}
