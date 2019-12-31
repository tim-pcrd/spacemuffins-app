import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { QuizResolverService } from './quiz/quiz-resolver.service';
import { AuthGuard } from './auth/auth-guard.service';
import { LoginGuard } from './auth/login/login-guard.service';
import { QuizFotosComponent } from './quiz/quiz-fotos/quiz-fotos.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'quizzen', component: QuizComponent},
  {path: 'quizzen/:id', component: QuizDetailComponent, canActivate: [AuthGuard]},
  {path: 'fotos/:id', component: QuizFotosComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
