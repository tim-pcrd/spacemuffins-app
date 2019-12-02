import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { SuccessComponent } from './success/success.component';

@Injectable({providedIn: 'root'})
export class UIService {
  changeTabIndex = new Subject<number>();

  constructor() {}

}
