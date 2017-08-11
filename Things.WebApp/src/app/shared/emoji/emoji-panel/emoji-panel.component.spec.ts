import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiPanelComponent } from './emoji-panel.component';

describe('EmojiPanelComponent', () => {
  let component: EmojiPanelComponent;
  let fixture: ComponentFixture<EmojiPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmojiPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
