import { Component, OnInit, OnDestroy } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Params, ParamMap, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss']
})
export class QuizDetailComponent implements OnInit, OnDestroy {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  invallers: string[] = [];
  private quizId;
  private quizSub: Subscription;
  private authSub: Subscription;
  quizForm: FormGroup;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.quizSub = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.quizId = params.get('id');
          return this.quizService.getQuiz(this.quizId);
        })
      )
      .subscribe(data => {
        if (data) {
          this.initForm(data);
          this.invallers = data.invallers;
          this.isLoading = false;
        } else {
          this.router.navigate(['/quizzen']);
        }
      });


    this.authSub = this.authService.authChange
      .subscribe(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/quizzen']);
        }
      });

  }

  private initForm(quizData) {
    console.log(quizData.naam);
    this.quizForm = new FormGroup({
      naam: new FormControl(quizData.naam, Validators.required),
      adres: new FormControl(quizData.adres, Validators.required),
      datum: new FormControl(quizData.datum.toDate(), Validators.required),
      uur: new FormControl(quizData.uur, Validators.required),
      aantalSpelers: new FormControl(quizData.aantalSpelers, Validators.required),
      arno: new FormControl(quizData.arno),
      bart: new FormControl(quizData.bart),
      tim: new FormControl(quizData.tim),
      ward: new FormControl(quizData.ward),
      opmerkingen: new FormControl(quizData.opmerkingen),
      link: new FormControl(quizData.link),
      behaaldePunten: new FormControl(quizData.behaaldePunten),
      maxPunten: new FormControl(quizData.maxPunten),
      positie: new FormControl(quizData.positie),
      aantalPloegen: new FormControl(quizData.aantalPloegen),
      score: new FormControl(quizData.score)
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

  onSubmit() {
    this.quizForm.value.invallers = this.invallers;
    this.quizForm.value.datum = moment(this.quizForm.value.datum).toDate();
    if (this.quizForm.valid) {
      this.quizService.updateQuiz(this.quizId, this.quizForm.value);
    }
  }

  onAnnuleer(form) {
    this.router.navigate(['/quizzen']);
  }

  ngOnDestroy() {
    if (this.quizSub) {
      this.quizSub.unsubscribe();
    }
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }


}
