import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementInfoComponent } from './payement-info.component';

describe('PayementInfoComponent', () => {
  let component: PayementInfoComponent;
  let fixture: ComponentFixture<PayementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PayementInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
