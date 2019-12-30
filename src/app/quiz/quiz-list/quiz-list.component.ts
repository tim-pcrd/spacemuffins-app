import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';
import { Seizoen } from '../seizoen.model';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { SpelersDialogComponent } from '../dialogs/spelers-dialog/spelers-dialog.component';
import { PuntenDialogComponent } from '../dialogs/punten-dialog/punten-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

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
export class QuizListComponent implements OnInit, AfterViewInit, OnDestroy {
  quizzen = new MatTableDataSource();
  seizoenen: Seizoen[] = [];
  selectedSeizoen: Seizoen;
  selectedSeizoenValue;
  displayedColumns = ['datum', 'naam', 'uur', 'aantalSpelers', 'spelers'];
  expandedElement: Quiz | null;
  dateNow;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  private quizSub: Subscription;
  private seizoenSub: Subscription;
  private authSub: Subscription;
  isLoading = false;
  isAuth = false;

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.authSub = this.authService.authChange
      .subscribe(isAuth => this.isAuth = isAuth);


    this.dateNow = new Date(new Date().toDateString());
    this.seizoenSub = this.seizoenSubscription();

    this.quizService.getSeizoenen();
  }

  ngAfterViewInit() {
    this.quizzen.paginator = this.paginator;
  }

  onChange() {
    if (this.selectedSeizoenValue === 'all') {
      this.quizSub.unsubscribe();
      this.quizService.getQuizzenFromDb()
        .pipe(
          take(1)
        )
        .subscribe(quizData => {
          this.quizzen.data = this.quizService.getQuizzen(quizData);
        });
    } else {

      this.selectedSeizoen = this.seizoenen
        .find(seizoen => this.selectedSeizoenValue === seizoen.id);


      if (this.selectedSeizoen.id !== this.seizoenen[0].id) {
        this.quizSub.unsubscribe();
        this.quizService.getQuizzenBySeizoenFromDb(this.selectedSeizoen.begindatum, this.selectedSeizoen.einddatum)
        .pipe(
          take(1)
        )
        .subscribe(quizData => {
          this.quizzen.data = this.quizService.getQuizzen(quizData);
        });
      } else if (this.quizSub.closed) {
        this.quizSub = this.quizSubscription(this.selectedSeizoen);
      }
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
        this.quizService.deleteQuiz(id);
      }
    });
  }

  onSpelersEdit(id) {
    const selectedQuiz = this.quizzen.data.find((quiz: Quiz) => quiz.id === id) as Quiz;
    const dialogRef = this.dialog.open(SpelersDialogComponent, {
      width: '300px',
      data: {
        quizTitle: selectedQuiz.naam,
        arno: selectedQuiz.arno,
        bart: selectedQuiz.bart,
        tim: selectedQuiz.tim,
        ward: selectedQuiz.ward,
        invallers: [...selectedQuiz.invallers]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        delete result.quizTitle;
        this.quizService.updateQuiz(selectedQuiz.id, result);
      }
    });
  }

  onPuntenEdit(id) {
    const selectedQuiz = this.quizzen.data.find((quiz: Quiz) => quiz.id === id) as Quiz;
    const dialogRef = this.dialog.open(PuntenDialogComponent, {
      width: '300px',
      data: {
        aantalSpelers: selectedQuiz.aantalSpelers
      }
    });
  }

  seizoenSubscription() {
    this.isLoading = true;
    return this.quizService.seizoenenChanged.subscribe(seizoenData => {
      this.seizoenen = seizoenData;
      this.selectedSeizoen = this.seizoenen[0];
      this.selectedSeizoenValue = this.selectedSeizoen.id;

      this.quizSub = this.quizSubscription(this.selectedSeizoen);

    });
  }

  quizSubscription(seizoen) {
    return this.quizService.getQuizzenBySeizoenFromDb(seizoen.begindatum, seizoen.einddatum)
    .subscribe(quizData => {
      this.quizzen.data = this.quizService.getQuizzen(quizData);
      this.isLoading = false;
    });
  }

  onQuizEdit(id) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.quizSub) {
      this.quizSub.unsubscribe();
    }
    if (this.seizoenSub) {
      this.seizoenSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }


}
