import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth = false;
  show = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authChange.subscribe(authState => {
      this.isAuth = authState;
      this.show = true;
    });
  }

  onCloseSideNav() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSideNav();
  }

}
