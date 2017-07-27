import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingUserDetailsComponent } from './thing-user-details.component';

describe('ThingUserDetailsComponent', () => {
  let component: ThingUserDetailsComponent;
  let fixture: ComponentFixture<ThingUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingUserDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
