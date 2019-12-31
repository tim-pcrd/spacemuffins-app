import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ImageViewerModule } from 'ng2-image-viewer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { QuizComponent } from './quiz/quiz.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { QuizNewComponent } from './quiz/quiz-new/quiz-new.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './auth/login/login.component';
import { SuccessComponent } from './shared/success/success.component';
import { ErrorComponent } from './shared/error/error.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { SpelersDialogComponent } from './quiz/dialogs/spelers-dialog/spelers-dialog.component';
import { PuntenDialogComponent } from './quiz/dialogs/punten-dialog/punten-dialog.component';
import { QuizFotosComponent } from './quiz/quiz-fotos/quiz-fotos.component';
import { FotoViewerComponent } from './quiz/quiz-fotos/foto-viewer/foto-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    QuizComponent,
    QuizListComponent,
    QuizNewComponent,
    QuizDetailComponent,
    LoginComponent,
    SuccessComponent,
    ErrorComponent,
    ConfirmationDialogComponent,
    SpelersDialogComponent,
    PuntenDialogComponent,
    QuizFotosComponent,
    FotoViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ImageViewerModule
  ],
  providers: [],
  entryComponents: [
    SuccessComponent,
    ErrorComponent,
    ConfirmationDialogComponent,
    SpelersDialogComponent,
    PuntenDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
