import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThingDescriptionComponent } from './edit-thing-description.component';

describe('EditThingDescriptionComponent', () => {
  let component: EditThingDescriptionComponent;
  let fixture: ComponentFixture<EditThingDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThingDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
