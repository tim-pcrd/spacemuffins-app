import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UIService } from 'src/app/shared/ui.service';
import { skip } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth = false;
  isLoading = false;

  constructor(private authService: AuthService, private uiService: UIService, private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.authChange
      .pipe(
        skip(1)
      )
      .subscribe(authState => {
        this.isAuth = authState;
        this.isLoading = false;
      });
  }

  onCloseSideNav() {
    this.sideNavClose.emit();
  }

  onLogout() {
    this.authService.logout();
    this.onCloseSideNav();
  }

  onChangeTab() {
    this.onCloseSideNav();
    this.uiService.changeTabIndex.next(0);
  }

}
