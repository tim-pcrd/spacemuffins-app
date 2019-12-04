import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';
import { Seizoen } from '../seizoen.model';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class QuizListComponent implements OnInit {
  quizzen = new MatTableDataSource();
  seizoenen: Seizoen[] = [];
  selectedSeizoen: Seizoen;
  selectedSeizoenValue;
  displayedColumns = ['datum', 'naam', 'uur', 'aantalSpelers'];
  expandedElement: Quiz | null;
  dateNow;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.dateNow = new Date();
    console.log(this.dateNow);
    this.quizService.quizzenChanged
    .subscribe(quizData => {
      this.quizzen.data = quizData;
      console.log(quizData[0].datum);
    });
    this.quizService.seizoenenChanged
      .subscribe(seizoenData => {
        this.seizoenen = seizoenData;
        this.selectedSeizoen = this.seizoenen[0];
        this.selectedSeizoenValue = this.selectedSeizoen.id;
        this.quizService.getQuizzenBySeizoen(this.selectedSeizoen.begindatum, this.selectedSeizoen.einddatum);
      });

    this.quizService.getSeizoenen();
  }

  onChange() {
    if (this.selectedSeizoenValue === 'all') {
      this.quizService.getQuizzen();
    } else {
      this.selectedSeizoen = this.seizoenen
      .find(seizoen => this.selectedSeizoenValue === seizoen.id);
      this.quizService.getQuizzenBySeizoen(this.selectedSeizoen.begindatum, this.selectedSeizoen.einddatum);
    }
    console.log(this.selectedSeizoen);
  }

}
