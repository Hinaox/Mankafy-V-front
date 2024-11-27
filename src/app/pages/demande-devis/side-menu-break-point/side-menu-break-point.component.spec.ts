import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuBreakPointComponent } from './side-menu-break-point.component';

describe('SideMenuBreakPointComponent', () => {
  let component: SideMenuBreakPointComponent;
  let fixture: ComponentFixture<SideMenuBreakPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuBreakPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuBreakPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
