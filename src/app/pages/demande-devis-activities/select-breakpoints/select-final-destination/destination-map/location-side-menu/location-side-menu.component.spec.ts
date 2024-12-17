import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationSideMenuComponent } from './location-side-menu.component';

describe('LocationSideMenuComponent', () => {
  let component: LocationSideMenuComponent;
  let fixture: ComponentFixture<LocationSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationSideMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
