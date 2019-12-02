import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { QuizService } from '../quiz.service';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { Quiz } from '../quiz.model';

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
  form: NgForm;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  addInvaller(event: MatChipInputEvent): void {
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

  removeInvaller(invaller): void {
    const index = this.invallers.indexOf(invaller);

    if (index >= 0) {
      this.invallers.splice(index, 1);
    }
  }

  onSubmit(form) {
    this.form = form;
    if (form.valid) {
      const newQuiz: Quiz = {
        naam: form.value.naam,
        adres: form.value.adres,
        datum: moment(form.value.datum).toDate(),
        uur: form.value.uur,
        aantalSpelers: form.value.aantalSpelers,
        arno: form.value.arno ? true : false,
        bart: form.value.bart ? true : false,
        tim: form.value.tim ? true : false,
        ward: form.value.ward ? true : false,
        invallers: this.invallers,
        opmerkingen: form.value.opmerkingen
      };

      this.quizService.addQuiz(newQuiz);
      this.invallers = [];
      form.resetForm();
    }
  }

  onReset(form) {
    this.form = form;
    this.invallers = [];
    this.form.resetForm();
  }

}
