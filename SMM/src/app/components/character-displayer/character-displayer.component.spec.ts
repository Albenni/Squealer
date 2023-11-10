import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDisplayerComponent } from './character-displayer.component';

describe('CharacterDisplayerComponent', () => {
  let component: CharacterDisplayerComponent;
  let fixture: ComponentFixture<CharacterDisplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacterDisplayerComponent]
    });
    fixture = TestBed.createComponent(CharacterDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
