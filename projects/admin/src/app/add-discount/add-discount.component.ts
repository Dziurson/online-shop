import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  productId: string;

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService,    
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == false)
      this.router.navigate(['/login'])
    this.route.params.subscribe(params => {
      this.productId = params['product-id'];      
    }); 
    this.adminService.header = 'Panel Administracyjny/Produkty/Dodawanie rabatu' 
  }

}
