import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

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
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == false)
    this.router.navigate(['/login'])
    this.route.params.subscribe(params => {
      const orderId = params['order-id'];
      this.orderService.getOrder(orderId).subscribe((order) => {
        this.order = order;        
      })
    });   
    this.adminService.header = 'Panel Administracyjny/Zamówienia/Szczegóły Zamówienia'
  }

  cancelOrder() {
    var self = this;
    this.orderService.setOrderState(this.order,'Odrzucone').then(()=> {

      self.router.navigate(['/panel/orders'])
    })
  }

  acceptOrder() {
    var self = this;
    this.orderService.setOrderState(this.order,'Zatwierdzone').then(()=> {
      self.router.navigate(['/panel/orders'])
    })
  }

}
