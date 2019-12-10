import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Quiz } from './quiz.model';
import { Observable } from 'rxjs';
import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class QuizResolverService implements Resolve<Quiz> {
  constructor(private quizService: QuizService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Quiz | Observable<Quiz> | Promise<Quiz> {
    console.log('hello');
    setTimeout(() => {

    }, 2000);
    return this.quizService.getQuiz(route.params.id)
      .pipe(
        take(1)
      );
  }

}
