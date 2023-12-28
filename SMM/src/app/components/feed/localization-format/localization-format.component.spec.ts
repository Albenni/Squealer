import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationFormatComponent } from './localization-format.component';

describe('LocalizationFormatComponent', () => {
  let component: LocalizationFormatComponent;
  let fixture: ComponentFixture<LocalizationFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizationFormatComponent]
    });
    fixture = TestBed.createComponent(LocalizationFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
