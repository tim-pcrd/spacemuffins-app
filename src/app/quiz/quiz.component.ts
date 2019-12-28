import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit, OnDestroy {
  tabIndex = 0;
  private tabSub: Subscription;
  private authSub: Subscription;
  isAuth = false;

  constructor(private uiService: UIService, private authService: AuthService) { }

  ngOnInit() {
    this.tabSub = this.uiService.changeTabIndex
      .subscribe(n => this.tabIndex = n);

    this.authSub = this.authService.authChange
      .subscribe(isAuth => this.isAuth = isAuth);
  }

  changeTab() {
    this.tabIndex = this.tabIndex === 0 ? 1 : 0;
  }

  ngOnDestroy() {
    if (this.tabSub) {
      this.tabSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }


}
