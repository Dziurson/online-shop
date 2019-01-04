import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProductDetailsComponent} from './product-details/product-details.component'
import { ProductsComponent } from './products/products.component'
import { SummaryComponent } from './summary/summary.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'cart', component: CartComponent},
  { path: 'home', component: HomeComponent },
  { path: 'order', component: OrderComponent},
  { path: 'products', component: ProductsComponent }, 
  { path: 'product/:product-id', component: ProductDetailsComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
