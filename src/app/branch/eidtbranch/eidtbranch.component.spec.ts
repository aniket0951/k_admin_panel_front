import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EidtbranchComponent } from './eidtbranch.component';

describe('EidtbranchComponent', () => {
  let component: EidtbranchComponent;
  let fixture: ComponentFixture<EidtbranchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EidtbranchComponent]
    });
    fixture = TestBed.createComponent(EidtbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
