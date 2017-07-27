import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeComponent } from './media-type.component';

describe('MediaTypeComponent', () => {
  let component: MediaTypeComponent;
  let fixture: ComponentFixture<MediaTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
