import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class StatistiekenService {
  private dateNow = new Date(new Date().toDateString());

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar) {}


  getQuizzen() {
    return this.db.collection('quizzen', ref => ref.where('datum', '<',  this.dateNow))
      .valueChanges();
  }


}
