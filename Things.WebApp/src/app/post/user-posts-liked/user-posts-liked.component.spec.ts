import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsLikedComponent } from './user-posts-liked.component';

describe('UserPostsLikedComponent', () => {
  let component: UserPostsLikedComponent;
  let fixture: ComponentFixture<UserPostsLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPostsLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPostsLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
