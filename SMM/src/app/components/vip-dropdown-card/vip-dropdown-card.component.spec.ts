import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipDropdownCardComponent } from './vip-dropdown-card.component';

describe('VipDropdownCardComponent', () => {
  let component: VipDropdownCardComponent;
  let fixture: ComponentFixture<VipDropdownCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VipDropdownCardComponent]
    });
    fixture = TestBed.createComponent(VipDropdownCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
