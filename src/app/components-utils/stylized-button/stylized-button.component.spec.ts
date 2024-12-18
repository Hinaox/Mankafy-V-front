import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylizedButtonComponent } from './stylized-button.component';

describe('StylizedButtonComponent', () => {
  let component: StylizedButtonComponent;
  let fixture: ComponentFixture<StylizedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylizedButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StylizedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
