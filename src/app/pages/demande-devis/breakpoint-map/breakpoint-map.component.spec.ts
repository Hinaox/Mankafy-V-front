import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakpointMapComponent } from './breakpoint-map.component';

describe('BreakpointMapComponent', () => {
  let component: BreakpointMapComponent;
  let fixture: ComponentFixture<BreakpointMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BreakpointMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakpointMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
