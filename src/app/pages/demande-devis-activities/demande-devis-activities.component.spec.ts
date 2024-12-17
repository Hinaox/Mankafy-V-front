import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisActivitiesComponent } from './demande-devis-activities.component';

describe('DemandeDevisActivitiesComponent', () => {
  let component: DemandeDevisActivitiesComponent;
  let fixture: ComponentFixture<DemandeDevisActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeDevisActivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
