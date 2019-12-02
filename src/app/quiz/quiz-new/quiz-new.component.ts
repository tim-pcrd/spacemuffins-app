import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-quiz-new',
  templateUrl: './quiz-new.component.html',
  styleUrls: ['./quiz-new.component.scss']
})
export class QuizNewComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  invallers: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.invallers.push(event.value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(invaller): void {
    const index = this.invallers.indexOf(invaller);

    if (index >= 0) {
      this.invallers.splice(index, 1);
    }
  }

}
