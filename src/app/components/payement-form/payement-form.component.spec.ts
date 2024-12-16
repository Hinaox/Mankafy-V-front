import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementFormComponent } from './payement-form.component';

describe('PayementFormComponent', () => {
  let component: PayementFormComponent;
  let fixture: ComponentFixture<PayementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
