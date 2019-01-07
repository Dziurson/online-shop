import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import * as io from 'socket.io-client';
(window as any).global = window

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private server = 'http://localhost:5000';
  useNodeService = false;
  private socket;

  constructor(private http: HttpClient) {    
  }

  connect() {
    this.socket = io(this.server).connect();
  }

  getProducts(): Observable<Product[]> {
    this.http.get<Product[]>(this.server + '/products').toPromise();
    return new Observable<Product[]>(observer => this.socket.on('products', data => observer.next(data)));
  }

  getProduct(id: string): Observable<any> {
    this.http.get<Product>(this.server + '/product/' + id).toPromise();
    return new Observable<any>(observer => this.socket.on('product', data => observer.next(data)));
  }

  getDiscount(id: string): Observable<any> {
    this.http.get<any>(this.server + '/discount/' + id).toPromise();
    return new Observable<any>(observer => this.socket.on('discount', data => observer.next(data)));
  }

  getCategories(): Observable<any> {
    this.http.get(this.server + '/categories').toPromise();
    return new Observable<any>(observer => this.socket.on('categories', data => observer.next(data)));
  }

  getDiscounts(): Observable<any> {
    this.http.get(this.server + '/discounts').toPromise();
    return new Observable<any>(observer => this.socket.on('discounts', data => observer.next(data)));
  }

  getOrders(): Observable<any> {
    this.http.get(this.server + '/orders').toPromise();
    return new Observable<any>(observer => this.socket.on('orders', data => observer.next(data)));
  }

  getOrder(id: string): Observable<any> {
    this.http.get(this.server + '/order/' + id).toPromise();
    return new Observable<any>(observer => this.socket.on('order', data => observer.next(data)));
  }

  insertProduct(product: any): Promise<any> {
    return this.http.post<any>(this.server + '/new-product', product).toPromise();
  }

  removeProduct(id: string): Promise<void> {
    return this.http.delete<void>(this.server + '/product/' + id).toPromise();
  }

  removeDiscount(id: string): Promise<void> {
    return this.http.delete<void>(this.server + '/discount/' + id).toPromise();
  }

  updateProduct(product: any): Promise<any> {
    return this.http.patch<any>(this.server + '/product/' + product.id, product).toPromise();
  }

  updateOrder(id: string, data: any): Promise<any> {
    return this.http.patch<any>(this.server + '/order/' + id, data).toPromise();
  }

  insertDiscount(data: any): Promise<any> {
    return this.http.post<any>(this.server + '/discount', data).toPromise();
  }

  insertOrder(order: any): Promise<any> {
    return this.http.post<any>(this.server + '/order', order).toPromise();
  }

  
}
