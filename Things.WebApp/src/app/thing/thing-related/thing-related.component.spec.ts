import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingRelatedComponent } from './thing-related.component';

describe('ThingRelatedComponent', () => {
  let component: ThingRelatedComponent;
  let fixture: ComponentFixture<ThingRelatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingRelatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingRelatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
