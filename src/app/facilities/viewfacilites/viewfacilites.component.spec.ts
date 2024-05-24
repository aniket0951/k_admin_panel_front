import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfacilitesComponent } from './viewfacilites.component';

describe('ViewfacilitesComponent', () => {
  let component: ViewfacilitesComponent;
  let fixture: ComponentFixture<ViewfacilitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewfacilitesComponent]
    });
    fixture = TestBed.createComponent(ViewfacilitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
