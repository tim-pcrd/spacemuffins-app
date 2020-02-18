import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvallersDialogComponent } from './invallers-dialog.component';

describe('InvallersDialogComponent', () => {
  let component: InvallersDialogComponent;
  let fixture: ComponentFixture<InvallersDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvallersDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvallersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
