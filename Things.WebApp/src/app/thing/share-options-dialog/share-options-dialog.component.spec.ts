import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareOptionsDialogComponent } from './share-options-dialog.component';

describe('ShareOptionsDialogComponent', () => {
  let component: ShareOptionsDialogComponent;
  let fixture: ComponentFixture<ShareOptionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareOptionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
