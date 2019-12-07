import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntenDialogComponent } from './punten-dialog.component';

describe('PuntenDialogComponent', () => {
  let component: PuntenDialogComponent;
  let fixture: ComponentFixture<PuntenDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntenDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
