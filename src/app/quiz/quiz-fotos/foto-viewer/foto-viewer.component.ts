import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-foto-viewer',
  templateUrl: './foto-viewer.component.html',
  styleUrls: ['./foto-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FotoViewerComponent implements OnInit {
  @Input() foto;
  constructor() { }

  ngOnInit() {

  }


}
