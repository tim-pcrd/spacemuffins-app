import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from './quiz.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../shared/success/success.component';
import { ErrorComponent } from '../shared/error/error.component';
import { Subject, Observable, pipe } from 'rxjs';
import { Seizoen } from './seizoen.model';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class QuizService {
  // private quizzen: Quiz[] = [];
  private seizoenen: Seizoen[] = [];
  // quizzenChanged = new Subject<Quiz[]>();
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

  getFirstQuizToCome() {
    return this.db.collection('quizzen', ref =>
      ref.where('datum', '>=', new Date()).orderBy('datum', 'asc').limit(1)).valueChanges() as Observable<Quiz[]>;
  }

  getQuizzenBySeizoenFromDb(beginDatum: Date, eindDatum: Date) {
    return this.db.collection('quizzen', ref =>
      ref.where('datum', '>=', beginDatum).where('datum', '<=', eindDatum).orderBy('datum', 'desc'))
      .valueChanges({idField: 'id'});
      // .subscribe((data) => {
      //   const quizData: Quiz[] = [];
      //   data.forEach(quiz => {
      //     quizData.push({
      //       ...quiz as Quiz,
      //       aantalSpelersAanwezig: this.getAantalSpelers(quiz)
      //     });
      //   });
      //   this.quizzen = quizData;
      //   this.quizzenChanged.next([...this.quizzen]);
      // });
  }

  getQuizzenFromDb() {
    return this.db.collection('quizzen', ref => ref.orderBy('datum', 'desc'))
      .valueChanges({idField: 'id'});

  }

  getQuizzen(data) {
    const quizData: Quiz[] = [];
    data.forEach(quiz => {
      quizData.push({
        ...quiz as Quiz,
        aantalSpelersAanwezig: this.getAantalSpelers(quiz)
      });
    });
    return quizData;
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
      .catch((err) => {
        this.snackBar.openFromComponent(ErrorComponent, {duration: 3000});
        console.log(err.message);
      });
  }

  updateQuiz(id, data) {
    this.db.collection('quizzen').doc(id)
      .update(data)
      .then(() => this.snackBar.open('Succesvol opgeslagen', null, {duration: 3000}))
      .catch(() =>  this.snackBar.openFromComponent(ErrorComponent, {duration: 3000}))
      .finally(() => this.router.navigate(['/quizzen']));
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

    if (quiz.invallers) {
      aantal += quiz.invallers.length;
    }

    return aantal;
  }

}
