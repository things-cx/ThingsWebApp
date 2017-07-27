import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThingTagsComponent } from './edit-thing-tags.component';

describe('EditThingTagsComponent', () => {
  let component: EditThingTagsComponent;
  let fixture: ComponentFixture<EditThingTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditThingTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThingTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
