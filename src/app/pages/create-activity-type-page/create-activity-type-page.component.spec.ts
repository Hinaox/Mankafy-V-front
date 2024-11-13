import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityTypePageComponent } from './create-activity-type-page.component';

describe('CreateActivityTypePageComponent', () => {
  let component: CreateActivityTypePageComponent;
  let fixture: ComponentFixture<CreateActivityTypePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateActivityTypePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityTypePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
