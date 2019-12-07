import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpelersDialogComponent } from './spelers-dialog.component';

describe('SpelersDialogComponent', () => {
  let component: SpelersDialogComponent;
  let fixture: ComponentFixture<SpelersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpelersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpelersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
