import { Product } from './product';

export class Order {
    id: string;
    name: string;
    surname: string;
    zipCode: string;
    city: string;
    phone: string;
    mail: string;
    products: Product[]; 
    status: string; 
  }