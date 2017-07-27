import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAmazonComponent } from './edit-amazon.component';

describe('EditAmazonComponent', () => {
  let component: EditAmazonComponent;
  let fixture: ComponentFixture<EditAmazonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAmazonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAmazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
