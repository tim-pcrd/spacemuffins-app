import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuizComponent implements OnInit, OnDestroy {
  tabIndex = 0;
  private sub: Subscription;

  constructor(private uiService: UIService) { }

  ngOnInit() {
    this.sub = this.uiService.changeTabIndex
      .subscribe(n => this.tabIndex = n);
  }

  changeTab() {
    this.tabIndex = this.tabIndex === 0 ? 1 : 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
