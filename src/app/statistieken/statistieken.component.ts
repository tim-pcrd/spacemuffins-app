import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StatistiekenService } from './statistieken.service';
import { Subscription } from 'rxjs';
import { Quiz } from '../quiz/quiz.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-statistieken',
  templateUrl: './statistieken.component.html',
  styleUrls: ['./statistieken.component.scss'],
  providers: [StatistiekenService]
})
export class StatistiekenComponent implements OnInit, OnDestroy {
  isLoading;
  quizzen: Quiz[];
  aantalQuizzen;
  aantalArno;
  aantalBart;
  aantalTim;
  aantalWard;
  aantalOverwinningen;
  aantalPodiumplaatsen;
  aantalLaatstePlaatsen;
  gemiddeldPercentage;
  downloadJsonHref: any;
  private sub1: Subscription;
  private sub2: Subscription;

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 10
          }
      }],
    }
  };
  barChartLabels: Label[] = ['<50%', '50% - 55%', '55% - 60%', '60% - 65%', '65% - 70%',
    '70% - 75%', '75% - 80%', '80% - 85%', '85% - 90%', '90% - 95%', '>95%'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  chartColors = [{backgroundColor: ['#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47',
    '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47']}];

  barChartData: ChartDataSets[];



  constructor(private statistiekenService: StatistiekenService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub1 = this.statistiekenService.getQuizzen()
      .subscribe((data: Quiz[]) => {
        this.quizzen = data;
        this.aantalQuizzen = this.quizzen.length;
        this.aantalArno = this.quizzen.filter(quiz => quiz.arno === true).length;
        this.aantalBart = this.quizzen.filter(quiz => quiz.bart === true).length;
        this.aantalTim = this.quizzen.filter(quiz => quiz.tim === true).length;
        this.aantalWard = this.quizzen.filter(quiz => quiz.ward === true).length;
        this.aantalOverwinningen = this.quizzen.filter(quiz => quiz.positie === 1).length;
        this.aantalPodiumplaatsen = this.quizzen.filter(quiz => quiz.positie <= 3).length;
        this.aantalLaatstePlaatsen = this.quizzen.filter(
          quiz => quiz.positie === quiz.aantalPloegen && quiz.positie && quiz.aantalPloegen
        ).length;

        this.gemiddeldPercentage = this.calculateGemiddelde(this.quizzen);
        this.calculateChart(this.quizzen);

        this.isLoading = false;
      });
  }

  calculateChart(quizzen: Quiz[]) {
    const under50 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten < 0.5 && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between50and55 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.5 && quiz.behaaldePunten / quiz.maxPunten < 0.55
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between55and60 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.55 && quiz.behaaldePunten / quiz.maxPunten < 0.6
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between60and65 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.6 && quiz.behaaldePunten / quiz.maxPunten < 0.65
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between65and70 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.65 && quiz.behaaldePunten / quiz.maxPunten < 0.7
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between70and75 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.7 && quiz.behaaldePunten / quiz.maxPunten < 0.75
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between75and80 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.75 && quiz.behaaldePunten / quiz.maxPunten < 0.8
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between80and85 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.8 && quiz.behaaldePunten / quiz.maxPunten < 0.85
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between85and90 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.85 && quiz.behaaldePunten / quiz.maxPunten < 0.9
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between90and95 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.9 && quiz.behaaldePunten / quiz.maxPunten < 0.95
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const over95 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.95
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;

    this.barChartData = [
      {
        data: [
          under50,
          between50and55,
          between55and60,
          between60and65,
          between65and70,
          between70and75,
          between75and80,
          between80and85,
          between85and90,
          between90and95,
          over95
        ],
        label: 'Aantal quizzen'
      }
    ];
  }

  calculateGemiddelde(quizzen: Quiz[]) {
    const percentages = this.quizzen
      .filter(quiz => quiz.behaaldePunten && quiz.maxPunten)
      .map(quiz => {
        return (quiz.behaaldePunten / quiz.maxPunten) * 100;
      });
    let totaal = 0;
    for (const percentage of percentages) {
      totaal += percentage;
    }
    return totaal / percentages.length;
  }

  onDownload() {
    this.sub2 = this.statistiekenService.getAllQuizzen().subscribe(data => {
      const json = JSON.stringify(data);
      const uri = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(json));
      this.downloadJsonHref = uri;
    });
  }


  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }


}
