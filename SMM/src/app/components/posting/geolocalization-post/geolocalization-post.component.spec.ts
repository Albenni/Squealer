import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocalizationPostComponent } from './geolocalization-post.component';

describe('GeolocalizationPostComponent', () => {
  let component: GeolocalizationPostComponent;
  let fixture: ComponentFixture<GeolocalizationPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeolocalizationPostComponent]
    });
    fixture = TestBed.createComponent(GeolocalizationPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
