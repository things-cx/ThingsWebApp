import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThingMediaItemsComponent } from './thing-media-items.component';

describe('ThingMediaItemsComponent', () => {
  let component: ThingMediaItemsComponent;
  let fixture: ComponentFixture<ThingMediaItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingMediaItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingMediaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
