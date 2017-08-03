import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MentionDialogComponent } from './mention-dialog.component';

describe('MentionComponent', () => {
  let component: MentionDialogComponent;
  let fixture: ComponentFixture<MentionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MentionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MentionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
