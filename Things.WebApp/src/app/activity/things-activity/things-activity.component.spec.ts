import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingsActivityComponent } from './things-activity.component';

describe('ThingsActivityComponent', () => {
  let component: ThingsActivityComponent;
  let fixture: ComponentFixture<ThingsActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingsActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
