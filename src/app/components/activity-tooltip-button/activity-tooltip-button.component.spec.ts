import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTooltipButtonComponent } from './activity-tooltip-button.component';

describe('ActivityTooltipButtonComponent', () => {
  let component: ActivityTooltipButtonComponent;
  let fixture: ComponentFixture<ActivityTooltipButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityTooltipButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTooltipButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
