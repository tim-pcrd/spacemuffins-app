import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class StatistiekenService {

  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar) {}

}
