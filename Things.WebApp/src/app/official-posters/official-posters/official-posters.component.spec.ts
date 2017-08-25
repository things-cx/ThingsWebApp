import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialPostersComponent } from './official-posters.component';

describe('OfficialPostersComponent', () => {
  let component: OfficialPostersComponent;
  let fixture: ComponentFixture<OfficialPostersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialPostersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialPostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
