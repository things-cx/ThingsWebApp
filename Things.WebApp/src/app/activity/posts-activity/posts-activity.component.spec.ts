import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsActivityComponent } from './posts-activity.component';

describe('PostsActivityComponent', () => {
  let component: PostsActivityComponent;
  let fixture: ComponentFixture<PostsActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
