import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpelersDialogComponent } from '../spelers-dialog/spelers-dialog.component';

@Component({
  selector: 'app-punten-dialog',
  templateUrl: './punten-dialog.component.html',
  styleUrls: ['./punten-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PuntenDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    public dialogRef: MatDialogRef<SpelersDialogComponent>
  ) { }

  ngOnInit() {
    console.log(this.passedData);
  }

}
