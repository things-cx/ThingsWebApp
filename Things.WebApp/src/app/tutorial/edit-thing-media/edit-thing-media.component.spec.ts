import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThingMediaComponent } from './edit-thing-media.component';

describe('EditThingMediaComponent', () => {
  let component: EditThingMediaComponent;
  let fixture: ComponentFixture<EditThingMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThingMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThingMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
