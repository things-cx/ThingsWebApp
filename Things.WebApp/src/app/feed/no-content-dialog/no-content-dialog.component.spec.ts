import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentDialogComponent } from './no-content-dialog.component';

describe('NoContentDialogComponent', () => {
  let component: NoContentDialogComponent;
  let fixture: ComponentFixture<NoContentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
