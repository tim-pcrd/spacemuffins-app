import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Quiz } from './quiz.model';
import { Observable, empty, EMPTY } from 'rxjs';
import { QuizService } from './quiz.service';
import { Injectable } from '@angular/core';
import {take, catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class QuizResolverService implements Resolve<Quiz> {
  constructor(private quizService: QuizService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Quiz | Observable<Quiz> | Promise<Quiz> {
    console.log('hello');
    setTimeout(() => {

    }, 2000);
    return this.quizService.getQuiz(route.params.id)
      .pipe(
        take(1),
        tap(data => {
          if (!data) {
            this.router.navigate(['/quizzen']);
            return EMPTY;
          }
        }),
        catchError((error) => {
          console.log(error);
          this.router.navigate(['/quizzen']);
          return EMPTY;
        })
      );
  }

}
