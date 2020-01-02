import { Component, OnInit } from '@angular/core';
import { StatistiekenService } from './statistieken.service';

@Component({
  selector: 'app-statistieken',
  templateUrl: './statistieken.component.html',
  styleUrls: ['./statistieken.component.scss'],
  providers: [StatistiekenService]
})
export class StatistiekenComponent implements OnInit {
  isLoading;

  constructor(private statistiekenService: StatistiekenService) { }

  ngOnInit() {
  }

}
