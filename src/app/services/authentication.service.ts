import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: string;
  role: string;
  state: any = null;

  constructor(
    private authentication: AngularFireAuth,
    private db: AngularFirestore) { 

    this.authentication.authState.subscribe((a) => this.state = a);    
  }  

  isUserLoggedIn(): boolean {
    return (this.state !== null);
  }

  logIn(mail: string, password: string) {
    return this.authentication.auth.signInWithEmailAndPassword(mail, password)
      .then((user) => {
        this.db.collection('users').doc(mail).ref.get()
        .then(doc => doc.data().role)
          .then((role) => {
            this.role = role;
            this.user = user.user.email;
            return this.state = user;
          });
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

  logOut() {
    this.role = null;
    this.state = null;
    return this.authentication.auth.signOut();
  }
}
