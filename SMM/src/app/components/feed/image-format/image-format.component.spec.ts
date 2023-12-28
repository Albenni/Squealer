import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFormatComponent } from './image-format.component';

describe('ImageFormatComponent', () => {
  let component: ImageFormatComponent;
  let fixture: ComponentFixture<ImageFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageFormatComponent]
    });
    fixture = TestBed.createComponent(ImageFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
