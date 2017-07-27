import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePublicThingComponent } from './create-public-thing.component';

describe('CreatePublicThingComponent', () => {
  let component: CreatePublicThingComponent;
  let fixture: ComponentFixture<CreatePublicThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePublicThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePublicThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
