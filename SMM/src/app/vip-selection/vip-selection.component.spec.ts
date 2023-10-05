import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipSelectionComponent } from './vip-selection.component';

describe('VipSelectionComponent', () => {
  let component: VipSelectionComponent;
  let fixture: ComponentFixture<VipSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VipSelectionComponent]
    });
    fixture = TestBed.createComponent(VipSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
