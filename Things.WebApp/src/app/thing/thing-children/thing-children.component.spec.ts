import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingChildrenComponent } from './thing-children.component';

describe('ThingChildrenComponent', () => {
  let component: ThingChildrenComponent;
  let fixture: ComponentFixture<ThingChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
