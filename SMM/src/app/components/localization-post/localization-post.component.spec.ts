import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizationPostComponent } from './localization-post.component';

describe('LocalizationPostComponent', () => {
  let component: LocalizationPostComponent;
  let fixture: ComponentFixture<LocalizationPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizationPostComponent]
    });
    fixture = TestBed.createComponent(LocalizationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
