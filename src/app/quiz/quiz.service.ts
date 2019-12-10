import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from './quiz.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../shared/success/success.component';
import { ErrorComponent } from '../shared/error/error.component';
import { Subject, Observable } from 'rxjs';
import { Seizoen } from './seizoen.model';

@Injectable({providedIn: 'root'})
export class QuizService {
  private quizzen: Quiz[] = [];
  private seizoenen: Seizoen[] = [];
  quizzenChanged = new Subject<Quiz[]>();
  seizoenenChanged = new Subject<Seizoen[]>();

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar) {}

  addQuiz(quiz: Quiz) {
    this.db.collection('quizzen').add(quiz)
      .then(data => {
        this.snackBar.openFromComponent(SuccessComponent, {duration: 4000});
      })
      .catch(error => {
        this.snackBar.openFromComponent(ErrorComponent, {duration: 3000});
        console.log(error.message);
      });
  }

  getQuizzenBySeizoen(beginDatum: Date, eindDatum: Date) {
    this.db.collection('quizzen', ref => ref.where('datum', '>=', beginDatum).where('datum', '<=', eindDatum).orderBy('datum', 'desc'))
      .valueChanges({idField: 'id'})
      .subscribe((data) => {
        const quizData: Quiz[] = [];
        data.forEach(quiz => {
          quizData.push({
            ...quiz as Quiz,
            aantalSpelersAanwezig: this.getAantalSpelers(quiz)
          });
        });
        this.quizzen = quizData;
        this.quizzenChanged.next([...this.quizzen]);
      });
  }

  getQuizzen() {
    this.db.collection('quizzen', ref => ref.orderBy('datum', 'desc'))
      .valueChanges({idField: 'id'})
      .subscribe((data) => {
        const quizData: Quiz[] = [];
        data.forEach(quiz => {
          quizData.push({
            ...quiz as Quiz,
            aantalSpelersAanwezig: this.getAantalSpelers(quiz)
          });
        });
        this.quizzen = quizData;
        this.quizzenChanged.next([...this.quizzen]);
      });
  }

  getQuiz(id) {
    return this.db.collection('quizzen').doc(id).valueChanges() as Observable<Quiz>;
  }

  getSeizoenen() {
    this.db.collection('seizoenen', ref => ref.orderBy('begindatum', 'desc'))
      .valueChanges({idField: 'id'})
      .subscribe((data) => {
        this.seizoenen = data as Seizoen[];
        this.seizoenenChanged.next([...this.seizoenen]);
      });
  }

  deleteQuiz(id) {
    this.db.collection('quizzen').doc(id)
      .ref.delete()
      .then(() => this.snackBar.open('Succesvol verwijderd.', null, {duration: 3000}))
      .catch(() => this.snackBar.openFromComponent(ErrorComponent, {duration: 3000}));
  }

  updateQuiz(id, data) {
    this.db.collection('quizzen').doc(id)
      .update(data)
      .then(() => this.snackBar.open('Succesvol opgeslagen', null, {duration: 3000}))
      .catch(() =>  this.snackBar.openFromComponent(ErrorComponent, {duration: 3000}));
  }

  getAantalSpelers(quiz) {
    let aantal = 0;
    if (quiz.arno) {
      aantal += 1;
    }
    if (quiz.bart) {
      aantal += 1;
    }
    if (quiz.tim) {
      aantal += 1;
    }
    if (quiz.ward) {
      aantal += 1;
    }
    if (quiz.invallers.length > 0) {
      aantal += quiz.invallers.length;
    }

    return aantal;
  }

}
