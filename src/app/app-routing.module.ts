import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { QuizResolverService } from './quiz/quiz-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'quizzen', component: QuizComponent},
  {path: 'quizzen/:id', component: QuizDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
