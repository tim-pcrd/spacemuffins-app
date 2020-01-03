import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatistiekenService } from './statistieken.service';
import { Subscription } from 'rxjs';
import { Quiz } from '../quiz/quiz.model';

@Component({
  selector: 'app-statistieken',
  templateUrl: './statistieken.component.html',
  styleUrls: ['./statistieken.component.scss'],
  providers: [StatistiekenService]
})
export class StatistiekenComponent implements OnInit, OnDestroy {
  isLoading;
  quizzen: Quiz[];
  aantalQuizzen;
  aantalArno;
  aantalBart;
  aantalTim;
  aantalWard;
  aantalOverwinningen;
  aantalPodiumplaatsen;
  aantalLaatstePlaatsen;
  private sub: Subscription;

  constructor(private statistiekenService: StatistiekenService) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.statistiekenService.getQuizzen()
      .subscribe((data: Quiz[]) => {
        this.quizzen = data;
        this.aantalQuizzen = this.quizzen.length;
        this.aantalArno = this.quizzen.filter(quiz => quiz.arno === true).length;
        this.aantalBart = this.quizzen.filter(quiz => quiz.bart === true).length;
        this.aantalTim = this.quizzen.filter(quiz => quiz.tim === true).length;
        this.aantalWard = this.quizzen.filter(quiz => quiz.ward === true).length;
        this.aantalOverwinningen = this.quizzen.filter(quiz => quiz.positie === 1).length;
        this.aantalPodiumplaatsen = this.quizzen.filter(quiz => quiz.positie <= 3).length;
        this.aantalLaatstePlaatsen = this.quizzen.filter(quiz => quiz.positie === quiz.aantalPloegen).length;
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
