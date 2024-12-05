import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySuggestionViewComponent } from './activity-suggestion-view.component';

describe('ActivitySuggestionViewComponent', () => {
  let component: ActivitySuggestionViewComponent;
  let fixture: ComponentFixture<ActivitySuggestionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitySuggestionViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySuggestionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
