import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { FotoService } from './foto.service';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-quiz-fotos',
  templateUrl: './quiz-fotos.component.html',
  styleUrls: ['./quiz-fotos.component.scss']
})
export class QuizFotosComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  quizId;
  urlList = [];
  isLoading = true;
  fotoToUpload;
  clickedFoto;
  public imagePath;
  imgUrl: any;
  quizInfo;
  private fotoSub: Subscription;
  private quizSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private fotoService: FotoService,
    private quizService: QuizService) { }

  ngOnInit() {
    this.isLoading = true;
    this.routeSub = this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.quizId = params.get('id');
        this.fotoSub = this.fotoService.fotosChange
          .subscribe(list => {
            this.urlList = list;
            this.isLoading = false;
            this.onDeletePreview();
          });
        this.quizSub = this.quizService.getQuiz(this.quizId)
          .subscribe((data) => {
            this.quizInfo = data;
          });
        this.fotoService.getList(this.quizId);
      });


  }

  uploadFoto(event) {
    this.fotoToUpload = event.target.files[0];
    this.fotoService.getList(this.quizId);
  }

  saveFoto() {
    if (this.fotoToUpload) {
      this.fotoService.uploadFile(this.quizId, this.fotoToUpload);
    }
  }

  onFileSelected(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgUrl = reader.result;
      this.fotoToUpload = files[0];
    };
  }

  onImagePick(url) {
    this.clickedFoto = url;
  }

  onDeletePreview() {
    this.imgUrl = null;
    this.fotoToUpload = null;
  }

  deleteFoto() {
    console.log('sdfsdfsdfsdf');
    console.log(this.clickedFoto);
    if (this.clickedFoto && this.quizId) {
      console.log('hello');
      this.fotoService.deleteFile(this.clickedFoto, this.quizId);
      this.clickedFoto = null;
    }
  }

  ngOnDestroy() {
    if (this.fotoSub) {
      this.fotoSub.unsubscribe();
    }
    if (this.quizSub) {
      this.quizSub.unsubscribe();
    }
  }



  // addJson() {
  //   const arr: Quiz[] = this.json.map(quiz => {
  //     return {
  //       naam: quiz.naam,
  //       adres:  quiz.adres,
  //       datum : new Date(quiz.datum),
  //       arno: quiz.arno,
  //       bart: quiz.bart,
  //       tim: quiz.tim,
  //       ward: quiz.ward,
  //       opmerkingen: quiz.opmerkingen ? quiz.opmerkingen : '',
  //       link: quiz.link || '',
  //       aantalSpelers: Number(quiz.aantalSpelers),
  //       uur: '20.00',
  //       invallers: [],
  //       positie: Number(quiz.positie.slice(0, quiz.positie.indexOf('/'))),
  //       aantalPloegen: Number(quiz.positie.slice(quiz.positie.indexOf('/')+1)),
  //       score: Number(quiz.score) || null
  //     }
  //   });

  //   console.log(arr);

  //   arr.forEach((quiz: Quiz) => {
  //     this.quizService.addQuiz(quiz);
  //   })
  // }





}
