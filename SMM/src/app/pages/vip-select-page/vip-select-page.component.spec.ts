import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipSelectPageComponent } from './vip-select-page.component';

describe('VipSelectPageComponent', () => {
  let component: VipSelectPageComponent;
  let fixture: ComponentFixture<VipSelectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VipSelectPageComponent]
    });
    fixture = TestBed.createComponent(VipSelectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
