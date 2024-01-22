import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedTabComponent } from './feed-tab.component';

describe('FeedTabComponent', () => {
  let component: FeedTabComponent;
  let fixture: ComponentFixture<FeedTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedTabComponent]
    });
    fixture = TestBed.createComponent(FeedTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
