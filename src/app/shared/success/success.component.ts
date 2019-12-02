import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIService } from '../ui.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(private router: Router, private uiService: UIService) { }

  ngOnInit() {
  }

  onClick() {
    this.uiService.changeTabIndex.next(0);
  }

}
