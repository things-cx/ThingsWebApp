import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShortcutThingComponent } from './create-shortcut-thing.component';

describe('CreateShortcutThingComponent', () => {
  let component: CreateShortcutThingComponent;
  let fixture: ComponentFixture<CreateShortcutThingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShortcutThingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShortcutThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
