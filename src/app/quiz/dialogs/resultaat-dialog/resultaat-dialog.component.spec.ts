import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultaatDialogComponent } from './resultaat-dialog.component';

describe('ResultaatDialogComponent', () => {
  let component: ResultaatDialogComponent;
  let fixture: ComponentFixture<ResultaatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultaatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultaatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
