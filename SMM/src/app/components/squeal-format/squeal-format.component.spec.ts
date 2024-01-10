import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquealFormatComponent } from './squeal-format.component';

describe('SquealFormatComponent', () => {
  let component: SquealFormatComponent;
  let fixture: ComponentFixture<SquealFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SquealFormatComponent]
    });
    fixture = TestBed.createComponent(SquealFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
