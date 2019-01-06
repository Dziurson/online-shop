import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  title = 'admin';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}
    
  logOut() {
    var self = this;
    this.authenticationService.logOut().then(() => {
      self.router.navigate(['/login'])
    })
  }
}
