import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { Category } from '../model/category';
import { NodeService } from './node.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  lastVisited: Product[] = [];
  constructor(
    private db: AngularFirestore,
    private nodeSerivice: NodeService) {
    const savedLastVisited = localStorage.getItem('lastVisited');
    if (savedLastVisited)
      this.lastVisited = JSON.parse(savedLastVisited);
  }

  getProduct(productId: string) {
    if (!this.nodeSerivice.useNodeService)
      return this.getProducts().pipe(map(p => p.find(p => p.id == productId)))
    else
      return this.nodeSerivice.getProduct(productId).pipe(map(product => ({id: product._id, ...product})));
  }

  getProducts(): Observable<Product[]> {
    if (!this.nodeSerivice.useNodeService) {
      let products: AngularFirestoreCollection<Product> = this.db.collection('products')
      return products
        .snapshotChanges()
        .pipe(map((changes) =>
          changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
    }
    else {
      return this.nodeSerivice.getProducts().pipe(map((changes) =>
        changes.map((product: any) => ({ id: product._id, ...product }))));
    }
  }

  insertProduct(product, redirectlink = null) {
    var self = this;
    if (!this.nodeSerivice.useNodeService) {
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
        self.db.collection('products').doc(product.id.toString()).set(product).then(() => {
          if (redirectlink)
            window.location.href = redirectlink;
        });
      }).catch(function (error) {
        console.log("Transaction failed: ", error);
      });
    }
    else {      
      this.nodeSerivice.insertProduct(product).then(() => {
        if (redirectlink)
            window.location.href = redirectlink;
      });
    }
  }

  removeProduct(productId) {
    if (!this.nodeSerivice.useNodeService)
      return this.db.collection('products').doc(productId.toString()).delete();
    else
      return this.nodeSerivice.removeProduct(productId);
  }

  updateProduct(product: Product) {
    if (!this.nodeSerivice.useNodeService)
      return this.db.collection('products').doc(product.id.toString()).set(product);
    else
      return this.nodeSerivice.updateProduct(product);
  }

  setVisited(product: Product) {
    if(!this.lastVisited)
      this.lastVisited = [];
    if (this.lastVisited.length == 10) {
      this.lastVisited.splice(0, 1);
    }
    var current = this.lastVisited.findIndex(p => p.id == product.id);
    if (current != -1)
      this.lastVisited.splice(current, 1);
    this.lastVisited.push(product);
    localStorage.setItem('lastVisited', JSON.stringify(this.lastVisited));
  }

  getCategories() {
    let categories: AngularFirestoreCollection<Category> = this.db.collection('categories')
    return categories
      .snapshotChanges()
      .pipe(map((changes) =>
        changes.map(a => ({ id: a.payload.doc.id, ...a.payload.doc.data() }))));
  }
}
