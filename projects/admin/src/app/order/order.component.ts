import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../../../src/app/model/order';
import { OrderService } from '../../../../../src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: Order;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit() {
    //if(this.authenticationService.isUserLoggedIn() == false)
     // this.router.navigate(['/login'])
    this.route.params.subscribe(params => {
      const orderId = params['order-id'];
      this.orderService.getOrder(orderId).subscribe((order) => {
        this.order = order;        
      })
    });    
  }

  cancelOrder() {
    var self = this;
    this.orderService.setOrderState(this.order.id,'Odrzucone').then(()=> {
      self.router.navigate(['/panel/orders'])
    })
  }

  acceptOrder() {
    var self = this;
    this.orderService.setOrderState(this.order.id,'Zatwierdzone').then(()=> {
      self.router.navigate(['/panel/orders'])
    })
  }

}
