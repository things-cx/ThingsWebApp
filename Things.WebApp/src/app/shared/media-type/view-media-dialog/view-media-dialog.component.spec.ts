import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediaDialogComponent } from './view-media-dialog.component';

describe('ViewMediaDialogComponent', () => {
  let component: ViewMediaDialogComponent;
  let fixture: ComponentFixture<ViewMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
