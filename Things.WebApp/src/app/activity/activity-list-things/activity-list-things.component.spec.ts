import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListThingsComponent } from './activity-list-things.component';

describe('ActivityListThingsComponent', () => {
  let component: ActivityListThingsComponent;
  let fixture: ComponentFixture<ActivityListThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
