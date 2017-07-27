import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleCustomSearchComponent } from './google-custom-search.component';

describe('GoogleCustomSearchComponent', () => {
  let component: GoogleCustomSearchComponent;
  let fixture: ComponentFixture<GoogleCustomSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleCustomSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleCustomSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
