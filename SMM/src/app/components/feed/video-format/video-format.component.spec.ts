import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoFormatComponent } from './video-format.component';

describe('VideoFormatComponent', () => {
  let component: VideoFormatComponent;
  let fixture: ComponentFixture<VideoFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoFormatComponent]
    });
    fixture = TestBed.createComponent(VideoFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
