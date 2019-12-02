import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new Subject<boolean>();

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

  authListener() {
    // this.firebaseAuth.auth.onAuthStateChanged(user => {
    //   console.log(user);
    //   if (user) {
    //     this.authChange.next(true);
    //   } else {
    //     this.authChange.next(false);
    //   }
    // });

    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
      } else {
        this.authChange.next(false);
        this.router.navigate(['/']);
      }
    });
  }

  login(authData: AuthData) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log('user is logged in');
      })
      .catch(error => {
        console.log(this.handleErrorMessages(error));
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        console.log('user logged out');
      })
      .catch(error => {
        console.log(this.handleErrorMessages(error));
      });
  }

  handleErrorMessages(error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        errorMessage = 'Email of wachtwoord is ongeldig';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Dit account is uitgeschakeld';
        break;
      default:
        errorMessage = 'Er is een onbekende fout opgetreden';
    }

    return errorMessage;
  }
}
