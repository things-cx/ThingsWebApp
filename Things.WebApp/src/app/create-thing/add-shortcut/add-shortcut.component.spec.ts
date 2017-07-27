import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShortcutComponent } from './add-shortcut.component';

describe('AddShortcutComponent', () => {
  let component: AddShortcutComponent;
  let fixture: ComponentFixture<AddShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
