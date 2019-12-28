import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class AuthService {
  authChange = new BehaviorSubject(false);
  isLoading = new Subject<boolean>();

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {}

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
      }
    });
  }

  login(authData: AuthData) {
    this.isLoading.next(true);
    this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.isLoading.next(false);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.isLoading.next(false);
        this.snackBar.open(this.handleErrorMessages(error), null, {duration: 4000});
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.snackBar.open(this.handleErrorMessages(error), null, {duration: 4000});
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
      case 'auth/too-many-requests':
        errorMessage = 'Te veel foutieve aanmeldpogingen. Probeer het later nog eens.';
        break;
      default:
        errorMessage = 'Er is een onbekende fout opgetreden';
    }

    return errorMessage;
  }
}
