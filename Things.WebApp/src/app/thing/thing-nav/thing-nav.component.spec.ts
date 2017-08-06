import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingNavComponent } from './thing-nav.component';

describe('ThingNavComponent', () => {
  let component: ThingNavComponent;
  let fixture: ComponentFixture<ThingNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
