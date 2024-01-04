import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipRequestsComponent } from './vip-requests.component';

describe('VipRequestsComponent', () => {
  let component: VipRequestsComponent;
  let fixture: ComponentFixture<VipRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VipRequestsComponent]
    });
    fixture = TestBed.createComponent(VipRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
