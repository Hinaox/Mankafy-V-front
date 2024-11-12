import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDatePeopleComponent } from './select-date-people.component';

describe('SelectDatePeopleComponent', () => {
  let component: SelectDatePeopleComponent;
  let fixture: ComponentFixture<SelectDatePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectDatePeopleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectDatePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
