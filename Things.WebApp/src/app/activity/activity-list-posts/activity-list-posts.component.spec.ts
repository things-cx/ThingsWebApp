import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListPostsComponent } from './activity-list-posts.component';

describe('ActivityListPostsComponent', () => {
  let component: ActivityListPostsComponent;
  let fixture: ComponentFixture<ActivityListPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityListPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
