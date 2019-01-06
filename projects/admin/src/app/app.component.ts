import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'admin';  
  constructor(
    private adminService: AdminService,
    private authenticationService: AuthenticationService,
    private router: Router) {}
    
  logOut() {
    var self = this;
    this.authenticationService.logOut().then(() => {
      self.router.navigate(['/login'])
    })
  }
}
