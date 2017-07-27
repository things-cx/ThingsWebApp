import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingPostsItemsComponent } from './thing-posts-items.component';

describe('ThingPostsItemsComponent', () => {
  let component: ThingPostsItemsComponent;
  let fixture: ComponentFixture<ThingPostsItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingPostsItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingPostsItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
