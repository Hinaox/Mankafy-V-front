import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointsPageComponent } from './breakpoints-page.component';

describe('BreakpointsPageComponent', () => {
  let component: BreakpointsPageComponent;
  let fixture: ComponentFixture<BreakpointsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakpointsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakpointsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
