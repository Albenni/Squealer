import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendTabComponent } from './trend-tab.component';

describe('TrendTabComponent', () => {
  let component: TrendTabComponent;
  let fixture: ComponentFixture<TrendTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrendTabComponent]
    });
    fixture = TestBed.createComponent(TrendTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
