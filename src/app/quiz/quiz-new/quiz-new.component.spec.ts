import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizNewComponent } from './quiz-new.component';

describe('QuizNewComponent', () => {
  let component: QuizNewComponent;
  let fixture: ComponentFixture<QuizNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
