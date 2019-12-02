import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from './quiz.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessComponent } from '../shared/success/success.component';
import { ErrorComponent } from '../shared/error/error.component';

@Injectable({providedIn: 'root'})
export class QuizService {

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar) {}

  addQuiz(quiz: Quiz) {
    this.db.collection('quizzen').add(quiz)
      .then(data => {
        this.snackBar.openFromComponent(SuccessComponent, {duration: 5000});
      })
      .catch(error => {
        this.snackBar.openFromComponent(ErrorComponent, {duration: 5000});
        console.log(error.message);
      });
  }
}
