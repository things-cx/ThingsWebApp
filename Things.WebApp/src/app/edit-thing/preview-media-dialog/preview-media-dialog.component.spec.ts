import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewMediaDialogComponent } from './preview-media-dialog.component';

describe('PreviewMediaDialogComponent', () => {
  let component: PreviewMediaDialogComponent;
  let fixture: ComponentFixture<PreviewMediaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewMediaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
