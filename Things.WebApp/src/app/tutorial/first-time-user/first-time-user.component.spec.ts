import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeUserComponent } from './first-time-user.component';

describe('FirstTimeUserComponent', () => {
  let component: FirstTimeUserComponent;
  let fixture: ComponentFixture<FirstTimeUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTimeUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
