import { Product } from './product';

export class Order {
    id: string;
    customerName: string;
    address: string;
    value: number;
    products: Product[];  
  }