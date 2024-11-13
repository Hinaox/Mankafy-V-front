import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityTypeComponent } from './create-activity-type.component';

describe('CreateActivityTypeComponent', () => {
  let component: CreateActivityTypeComponent;
  let fixture: ComponentFixture<CreateActivityTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateActivityTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
