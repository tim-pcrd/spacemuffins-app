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



  addJson() {
    const arr: Quiz[] = this.json.map(quiz => {
      return {
        naam: quiz.naam,
        adres:  quiz.adres,
        datum : new Date(quiz.datum),
        arno: quiz.arno,
        bart: quiz.bart,
        tim: quiz.tim,
        ward: quiz.ward,
        opmerkingen: quiz.opmerkingen ? quiz.opmerkingen : '',
        link: quiz.link || '',
        aantalSpelers: Number(quiz.aantalSpelers),
        uur: '20.00',
        invallers: [],
        positie: Number(quiz.positie.slice(0, quiz.positie.indexOf('/'))),
        aantalPloegen: Number(quiz.positie.slice(quiz.positie.indexOf('/')+1)),
        // score: Number(quiz.score) || null
      }
    });

    console.log(arr);

    arr.forEach((quiz: Quiz) => {
      this.quizService.addQuiz(quiz);
    })
  }

  private json =[
    {
        "naam": "Boezeroenenquiz",
        "adres": "Kuringen Van Groesbeekstraat 21 3511 Kuringen",
        "aantalSpelers": "6",
        "positie": "3/15",
        "datum": "5/5/17",
        "opmerkingen": "invaller: Simon Cosemans, Niels Digneffe",
        "arno": false,
        "bart": false,
        "tim": true,
        "ward": true
    },
    {
        "naam": "3e Lyceum-Quiz",
        "adres": "Collegelaan 30, Genk",
        "aantalSpelers": "5",
        "positie": "3/25",
        "datum": "5/12/17",
        "opmerkingen": "15 euro inkom betaald door Ward / invaller: Yannick Rigo en Bjorn Souverijns",
        "arno": false,
        "bart": true,
        "tim": true,
        "ward": true
    },
    {
        "naam": "6de Overtime Quiz",
        "adres": "CC Het Loo, Vismarkt Tessenderlo",
        "aantalSpelers": "5",
        "positie": "33/82",
        "datum": "5/13/17",
        "opmerkingen": "invaller: Niels Digneffe\r\n",
        "arno": false,
        "bart": true,
        "tim": true,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37629&boardid=3&styleid=1&sid=82ca3f96c65b7513b86288905240897d"
    },
    {
        "naam": "1e Koor Den Blanckaert Quiz",
        "adres": "voetbalkantine van Spouwen-Mopertingen, Blookstraat 31 te Mopertingen",
        "aantalSpelers": "4",
        "positie": "12/38",
        "datum": "5/19/17",
        "opmerkingen": "invaller: Simon Cosemans, Niels Digneffe",
        "arno": false,
        "bart": false,
        "tim": true,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37673&boardid=3&styleid=1&sid=f5cdf94e73112554a80357486c125fb6"
    },
    {
        "naam": "Quiz for India ism Den Onderhond",
        "adres": "Agora van de Universiteit Hasselt (campus Diepenbeek), Agoralaan - Gebouw D, 3590 Diepenbeek",
        "aantalSpelers": "6",
        "positie": "8/38",
        "datum": "5/24/17",
        "opmerkingen": "invaller: Simon Cosemans",
        "arno": true,
        "bart": true,
        "tim": true,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37724&boardid=3&styleid=1&sid=e27f61858bfc60edd10f1b9dd1fe22c0"
    },
    {
        "naam": "5e Otterspotters-Quiz",
        "adres": "Dorpsstraat 15, Ham",
        "aantalSpelers": "5",
        "positie": "25/52",
        "datum": "5/27/17",
        "opmerkingen": "invaller: Kenneth Lambrichts, Boris Wouters, Niels Langenaeken",
        "arno": true,
        "bart": true,
        "tim": false,
        "ward": false,
        "link": "http://forum.losflippos.be/thread.php?threadid=37753&boardid=3&styleid=1&sid=f5cdf94e73112554a80357486c125fb6"
    },
    {
        "naam": "Sound of C Lummen - Luc, Niels & David",
        "adres": "Oosterhof te Lummen",
        "aantalSpelers": "4",
        "positie": "23/25",
        "datum": "6/7/17",
        "opmerkingen": "invaller: Gabriele Di Giacinto, Niels Digneffe",
        "arno": false,
        "bart": false,
        "tim": true,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37823&boardid=3&styleid=1&sid=005b6b49af9d2785fe4235510f4184f0"
    },
    {
        "naam": "Zomerse Sint Paulus Quiz II",
        "adres": "  Sint Pauluszaal Diestersteenweg 33 3583 PAAL ",
        "aantalSpelers": "5",
        "positie": "19/20",
        "datum": "7/1/17",
        "arno": true,
        "bart": true,
        "tim": false,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37963&boardid=3&styleid=1&sid=7ac415622fdf99e1aba068af213f58bd"
    },
    {
        "naam": "1e Vlee Kier Al Gezeet Zomer-Quiz",
        "adres": " Thiewinkel Sint-Janstraat 9 3560 - Lummen",
        "aantalSpelers": "5",
        "positie": "3/20",
        "datum": "7/8/17",
        "opmerkingen": "invaller: Yannick Rigo",
        "arno": true,
        "bart": true,
        "tim": true,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=37997&boardid=3&styleid=1&sid=e154011baa9d0998863fb3b43e9ec44a"
    },
    {
        "naam": "5de Varendonkvraagtquiz ",
        "adres": "Spiegeltent aan Grote Steenweg 50 in 2431 Varendonk-Laakdal ",
        "aantalSpelers": "6",
        "positie": "21/35",
        "datum": "7/28/17",
        "opmerkingen": "30 euro inschrijving betaald door Ward = inkom + 10 euro drankkaart. Invaller: Simon",
        "arno": true,
        "bart": true,
        "tim": false,
        "ward": true,
        "link": "http://forum.losflippos.be/thread.php?threadid=38075&boardid=3&styleid=1&sid=6cff6e9b7626d8bf90d3c2519afaa4e0"
    }
]



}
