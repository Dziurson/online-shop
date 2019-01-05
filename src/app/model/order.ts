import { Product } from './product';

export class Order {
    id: string;
    name: string;
    surname: string;
    zipCode: string;
    city: string;
    phone: string;
    email: string;
    products: Product[]; 
    status: string; 
  }