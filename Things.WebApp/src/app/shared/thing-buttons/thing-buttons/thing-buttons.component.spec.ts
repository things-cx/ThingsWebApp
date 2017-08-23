import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingButtonsComponent } from './thing-buttons.component';

describe('ThingButtonsComponent', () => {
  let component: ThingButtonsComponent;
  let fixture: ComponentFixture<ThingButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
