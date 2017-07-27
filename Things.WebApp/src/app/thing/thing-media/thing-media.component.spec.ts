import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingMediaComponent } from './thing-media.component';

describe('ThingMediaComponent', () => {
  let component: ThingMediaComponent;
  let fixture: ComponentFixture<ThingMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
