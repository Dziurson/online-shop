import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  password: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn() == true) {
      this.router.navigate(['/panel'])
    }
  }

  logIn() {
    var self = this;
    this.authenticationService.logIn(this.login, this.password).then(() => {
      self.router.navigate(['/panel'])
    });    
  }

}
