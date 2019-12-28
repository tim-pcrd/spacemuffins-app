import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private loadingSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadingSub = this.authService.isLoading
      .subscribe(loading => this.isLoading = loading);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.authService.login({
        email: form.value.email,
        password: form.value.password
      });
    }
  }


  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

}
