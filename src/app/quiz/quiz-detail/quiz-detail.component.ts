import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  invallers: string[] = [];
  private quizId;
  private sub: Subscription;
  quizForm: FormGroup;

  constructor(private route: ActivatedRoute, private quizService: QuizService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.route.data.subscribe(data => {
      const quiz = data.quiz;
      console.log(quiz);
      this.quizForm = new FormGroup({
        naam: new FormControl(quiz.naam),
        adres: new FormControl(quiz.adres),
        datum: new FormControl(quiz.datum),
        uur: new FormControl(quiz.uur),
        aantalSpelers: new FormControl(quiz.aantalSpelers),
        arno: new FormControl(quiz.arno),
        bart: new FormControl(quiz.bart),
        tim: new FormControl(quiz.tim),
        ward: new FormControl(quiz.ward),
        opmerkingen: new FormControl(quiz.opmerkingen),
        link: new FormControl(quiz.link),
        behaaldePunten: new FormControl(quiz.behaaldePunten),
        maxPunten: new FormControl(quiz.maxPunten),
        positie: new FormControl(quiz.positie),
        aantalPloegen: new FormControl(quiz.aantalPloegen),
        score: new FormControl(quiz.score)
      });
    });
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

  onReset(form) {

  }

}
