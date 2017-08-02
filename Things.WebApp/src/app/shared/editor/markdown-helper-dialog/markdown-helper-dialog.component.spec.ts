import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownHelperDialogComponent } from './markdown-helper-dialog.component';

describe('MarkdownHelperDialogComponent', () => {
  let component: MarkdownHelperDialogComponent;
  let fixture: ComponentFixture<MarkdownHelperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownHelperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownHelperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
