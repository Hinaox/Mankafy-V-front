import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextBreakpointPageComponent } from './next-breakpoint-page.component';

describe('NextBreakpointPageComponent', () => {
  let component: NextBreakpointPageComponent;
  let fixture: ComponentFixture<NextBreakpointPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NextBreakpointPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NextBreakpointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
