import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { FotoService } from './foto.service';

@Component({
  selector: 'app-quiz-fotos',
  templateUrl: './quiz-fotos.component.html',
  styleUrls: ['./quiz-fotos.component.scss']
})
export class QuizFotosComponent implements OnInit {
  private routeSub: Subscription;
  quizId;
  urlList = [];
  fotoCount;
  isLoading = true;
  fotoToUpload;
  clickedFoto;

  constructor(private route: ActivatedRoute, private fotoService: FotoService) { }

  ngOnInit() {
    this.isLoading = true;
    this.routeSub = this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.quizId = params.get('id');
        this.fotoService.fotosChange
          .subscribe(list => {
            this.urlList = list;
            this.isLoading = false;
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

  testMethod() {
    this.urlList.forEach(url => {
      console.log(url);
    });
  }

  onImagePick(url) {
    this.clickedFoto = url;
  }

}
