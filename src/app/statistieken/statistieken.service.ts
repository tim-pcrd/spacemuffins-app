import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators';

@Injectable()
export class StatistiekenService {
  private dateNow = new Date(new Date().toDateString());

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar) {}


  getQuizzen() {
    return this.db.collection('quizzen', ref => ref.where('datum', '<',  this.dateNow))
      .valueChanges()
      .pipe(
        take(1)
      );
  }

  getAllQuizzen() {
    return this.db.collection('quizzen', ref => ref.orderBy('datum', 'desc'))
      .valueChanges()
      .pipe(
        take(1)
      );
  }




}
