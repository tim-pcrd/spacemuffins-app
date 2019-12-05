import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';
import { Seizoen } from '../seizoen.model';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

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

  constructor(private quizService: QuizService, private dialog: MatDialog) { }

  ngOnInit() {
    this.dateNow = new Date();
    this.quizService.quizzenChanged
    .subscribe(quizData => {
      this.quizzen.data = quizData;
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
  }

  onDeleteQuiz(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '280px',
      data: {
        text: 'Bent u zeker dat u deze quiz wilt verwijderen?',
        false: 'ANNULEER',
        true: 'VERWIJDER'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.quizService.deleteSeizoen(id);
      }
    });


  }

}
