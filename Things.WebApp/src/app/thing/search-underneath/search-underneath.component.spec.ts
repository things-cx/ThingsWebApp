import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUnderneathComponent } from './search-underneath.component';

describe('SearchUnderneathComponent', () => {
  let component: SearchUnderneathComponent;
  let fixture: ComponentFixture<SearchUnderneathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUnderneathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUnderneathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
