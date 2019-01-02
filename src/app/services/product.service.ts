import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { getProducts as fakeProducts, getProduct as fakeProduct, getProducts } from '../mock/mocks'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }

  getProduct(productId: string) {
    return getProducts().find(p => p.id == productId);
  }

  getProducts() : Observable<Product[]> {
    let products: AngularFirestoreCollection<Product> = this.db.collection('products')
    return products
        .snapshotChanges()
        .pipe(map((changes) =>
          changes.map(a => ({id: a.payload.doc.id, ...a.payload.doc.data()}))));
  }

  addProduct() {

  }

  removeProduct() {

  }
}
