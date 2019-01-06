import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {   
    if(this.authenticationService.isUserLoggedIn() == false)
      this.router.navigate(['/login']) 
    
    this.adminService.header = 'Panel Administracyjny'
  }

}
