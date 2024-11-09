import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBreakPointComponent } from './select-break-point.component';

describe('SelectBreakPointComponent', () => {
  let component: SelectBreakPointComponent;
  let fixture: ComponentFixture<SelectBreakPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectBreakPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBreakPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
