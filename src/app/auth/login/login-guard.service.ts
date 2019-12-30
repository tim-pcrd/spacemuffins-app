import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, skip } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.authChange.asObservable()
      .pipe(
        map(isAuth => {
          if (isAuth) {
            this.router.navigate(['/']);
            return false;
          } else {
            return true;
          }
        })
      );
  }

}
