import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingPostsComponent } from './thing-posts.component';

describe('ThingPostsComponent', () => {
  let component: ThingPostsComponent;
  let fixture: ComponentFixture<ThingPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
