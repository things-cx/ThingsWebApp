import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentPostsDialogComponent } from './no-content-posts-dialog.component';

describe('NoContentPostsDialogComponent', () => {
  let component: NoContentPostsDialogComponent;
  let fixture: ComponentFixture<NoContentPostsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentPostsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentPostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
