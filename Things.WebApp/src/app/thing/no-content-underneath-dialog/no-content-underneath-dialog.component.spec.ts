import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentUnderneathDialogComponent } from './no-content-underneath-dialog.component';

describe('NoContentUnderneathDialogComponent', () => {
  let component: NoContentUnderneathDialogComponent;
  let fixture: ComponentFixture<NoContentUnderneathDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentUnderneathDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentUnderneathDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
