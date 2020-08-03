import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { QuizService } from '../quiz/quiz.service';
import { Quiz } from '../quiz/quiz.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  quizSub: Subscription;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.quizSub = this.quizService.getFirstQuizToCome().subscribe(quizzen => this.quiz = quizzen[0]);
  }

  ngOnDestroy(): void {
    this.quizSub.unsubscribe();
  }





}
