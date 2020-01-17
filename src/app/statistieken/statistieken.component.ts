import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StatistiekenService } from './statistieken.service';
import { Subscription } from 'rxjs';
import { Quiz } from '../quiz/quiz.model';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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
  private sub: Subscription;

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
  barChartLabels: Label[] = ['<50%', '50% - 60%', '60% - 70%', '70% - 80%', '80% - 90%', '>90%'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  chartColors = [{backgroundColor: ['#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47', '#2a4b47']}];

  barChartData: ChartDataSets[];



  constructor(private statistiekenService: StatistiekenService) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub = this.statistiekenService.getQuizzen()
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

        this.calculateChart(this.quizzen);

        this.isLoading = false;
      });
  }

  calculateChart(quizzen: Quiz[]) {
    const under50 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten < 0.5 && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between50and60 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.5 && quiz.behaaldePunten / quiz.maxPunten < 0.6
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between60and70 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.6 && quiz.behaaldePunten / quiz.maxPunten < 0.7
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between70and80 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.7 && quiz.behaaldePunten / quiz.maxPunten < 0.8
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const between80and90 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.8 && quiz.behaaldePunten / quiz.maxPunten < 0.9
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;
    const over90 = this.quizzen.filter(
      quiz => quiz.behaaldePunten / quiz.maxPunten >= 0.9
      && quiz.behaaldePunten && quiz.maxPunten
    ).length;

    this.barChartData = [
      {
        data: [
          under50,
          between50and60,
          between60and70,
          between70and80,
          between80and90,
          over90
        ],
        label: 'Aantal quizzen'
      }
    ];
  }


  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }


}
