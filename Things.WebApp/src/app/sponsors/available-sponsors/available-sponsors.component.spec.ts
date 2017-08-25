import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableSponsorsComponent } from './available-sponsors.component';

describe('AvailableSponsorsComponent', () => {
  let component: AvailableSponsorsComponent;
  let fixture: ComponentFixture<AvailableSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
