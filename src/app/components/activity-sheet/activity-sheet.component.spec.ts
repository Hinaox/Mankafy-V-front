import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySheetComponent } from './activity-sheet.component';

describe('ActivitySheetComponent', () => {
  let component: ActivitySheetComponent;
  let fixture: ComponentFixture<ActivitySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitySheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
