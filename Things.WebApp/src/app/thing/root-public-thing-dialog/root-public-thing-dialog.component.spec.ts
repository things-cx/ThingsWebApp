import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RootPublicThingDialogComponent } from './root-public-thing-dialog.component';

describe('RootPublicThingDialogComponent', () => {
  let component: RootPublicThingDialogComponent;
  let fixture: ComponentFixture<RootPublicThingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RootPublicThingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootPublicThingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
