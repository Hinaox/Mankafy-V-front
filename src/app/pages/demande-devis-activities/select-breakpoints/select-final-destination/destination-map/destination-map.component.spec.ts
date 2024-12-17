import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinationMapComponent } from './destination-map.component';

describe('DestinationMapComponent', () => {
  let component: DestinationMapComponent;
  let fixture: ComponentFixture<DestinationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DestinationMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
