import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFinalDestinationComponent } from './select-final-destination.component';

describe('SelectFinalDestinationComponent', () => {
  let component: SelectFinalDestinationComponent;
  let fixture: ComponentFixture<SelectFinalDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectFinalDestinationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFinalDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
