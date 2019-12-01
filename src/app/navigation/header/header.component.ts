import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth = false;
  show = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange
      .subscribe(isAuth => {
        this.isAuth = isAuth;
        this.show = true;
        console.log(this.isAuth);
      });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }


  onLogout() {
    this.authService.logout();
  }

}
