import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstBreakpointPageComponent } from './first-breakpoint-page.component';

describe('FirstBreakpointPageComponent', () => {
  let component: FirstBreakpointPageComponent;
  let fixture: ComponentFixture<FirstBreakpointPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstBreakpointPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstBreakpointPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
