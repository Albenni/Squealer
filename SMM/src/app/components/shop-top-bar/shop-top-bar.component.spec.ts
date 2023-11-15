import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTopBarComponent } from './shop-top-bar.component';

describe('ShopTopBarComponent', () => {
  let component: ShopTopBarComponent;
  let fixture: ComponentFixture<ShopTopBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopTopBarComponent]
    });
    fixture = TestBed.createComponent(ShopTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
