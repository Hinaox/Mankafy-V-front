import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningCalendarComponent } from './planning-calendar.component';

describe('PlanningCalendarComponent', () => {
  let component: PlanningCalendarComponent;
  let fixture: ComponentFixture<PlanningCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanningCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
