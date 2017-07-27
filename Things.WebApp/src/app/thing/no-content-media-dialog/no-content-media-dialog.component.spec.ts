import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentMediaDialogComponent } from './no-content-media-dialog.component';

describe('NoContentMediaDialogComponent', () => {
  let component: NoContentMediaDialogComponent;
  let fixture: ComponentFixture<NoContentMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
