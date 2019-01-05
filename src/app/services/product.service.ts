import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

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

  addProduct() {

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
