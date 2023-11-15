import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactionsCardHeaderComponent } from './reactions-card-header.component';

describe('ReactionsCardHeaderComponent', () => {
  let component: ReactionsCardHeaderComponent;
  let fixture: ComponentFixture<ReactionsCardHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReactionsCardHeaderComponent]
    });
    fixture = TestBed.createComponent(ReactionsCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
