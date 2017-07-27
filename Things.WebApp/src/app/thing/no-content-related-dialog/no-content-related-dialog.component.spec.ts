import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoContentRelatedDialogComponent } from './no-content-related-dialog.component';

describe('NoContentRelatedDialogComponent', () => {
  let component: NoContentRelatedDialogComponent;
  let fixture: ComponentFixture<NoContentRelatedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentRelatedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentRelatedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
