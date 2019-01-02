import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { AngularFireModule } from 'angularfire2'; 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    ProductComponent,
    CreateProductComponent,
    CartComponent,
    ProductDetailsComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig), 
    AngularFireAuthModule, 
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
