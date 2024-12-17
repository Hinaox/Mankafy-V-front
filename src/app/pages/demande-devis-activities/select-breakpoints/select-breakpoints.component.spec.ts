import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBreakpointsComponent } from './select-breakpoints.component';

describe('SelectBreakpointsComponent', () => {
  let component: SelectBreakpointsComponent;
  let fixture: ComponentFixture<SelectBreakpointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectBreakpointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBreakpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
