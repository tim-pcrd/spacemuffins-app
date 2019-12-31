import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoViewerComponent } from './foto-viewer.component';

describe('FotoViewerComponent', () => {
  let component: FotoViewerComponent;
  let fixture: ComponentFixture<FotoViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
