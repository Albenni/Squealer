import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPostComponent } from './img-post.component';

describe('ImgPostComponent', () => {
  let component: ImgPostComponent;
  let fixture: ComponentFixture<ImgPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgPostComponent]
    });
    fixture = TestBed.createComponent(ImgPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
