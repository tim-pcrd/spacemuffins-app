import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SpelersDialogComponent } from '../spelers-dialog/spelers-dialog.component';

@Component({
  selector: 'app-invallers-dialog',
  templateUrl: './invallers-dialog.component.html',
  styleUrls: ['./invallers-dialog.component.scss']
})
export class InvallersDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    public dialogRef: MatDialogRef<SpelersDialogComponent>) { }

  ngOnInit() {
  }

  onAnnuleer() {
    this.dialogRef.close();
  }

}
