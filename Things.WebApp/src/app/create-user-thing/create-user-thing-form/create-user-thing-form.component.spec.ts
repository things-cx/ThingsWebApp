import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateThingFormComponent } from './create-thing-form.component';

describe('CreateThingFormComponent', () => {
  let component: CreateThingFormComponent;
  let fixture: ComponentFixture<CreateThingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateThingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateThingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
