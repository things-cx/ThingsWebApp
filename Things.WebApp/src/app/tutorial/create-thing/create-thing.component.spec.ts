import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThingComponent } from './create-thing.component';

describe('CreateThingComponent', () => {
  let component: CreateThingComponent;
  let fixture: ComponentFixture<CreateThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
