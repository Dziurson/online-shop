import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderComponent } from './order/order.component';
import { OrdersComponent } from './orders/orders.component';
import { PanelComponent } from './panel/panel.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},  
  { path: 'login', component: LoginComponent }, 
  { path: 'panel', component: PanelComponent },
  { path: 'panel/orders', component: OrdersComponent },
  { path: 'panel/orders/:order-id', component: OrderComponent },
  { path: 'panel/products', component: ProductsComponent },
  { path: 'panel/products/product/:product-id', component: ProductComponent },
  { path: 'panel/products/add-discount/:product-id', component: AddDiscountComponent},
  { path: 'panel/products/new-product', component: NewProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
