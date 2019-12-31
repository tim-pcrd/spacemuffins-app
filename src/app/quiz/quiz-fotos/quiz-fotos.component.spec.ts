import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizFotosComponent } from './quiz-fotos.component';

describe('QuizFotosComponent', () => {
  let component: QuizFotosComponent;
  let fixture: ComponentFixture<QuizFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
