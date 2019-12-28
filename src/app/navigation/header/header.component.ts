import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.authChange
      .pipe(
        skip(1)
      )
      .subscribe(isAuth => {
        this.isAuth = isAuth;
        this.isLoading = false;
      });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }


  onLogout() {
    this.authService.logout();
  }

}
