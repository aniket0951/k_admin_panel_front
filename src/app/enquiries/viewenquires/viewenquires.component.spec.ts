import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewenquiresComponent } from './viewenquires.component';

describe('ViewenquiresComponent', () => {
  let component: ViewenquiresComponent;
  let fixture: ComponentFixture<ViewenquiresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewenquiresComponent]
    });
    fixture = TestBed.createComponent(ViewenquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
