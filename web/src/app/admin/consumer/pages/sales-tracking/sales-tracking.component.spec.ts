import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrackingComponent } from './sales-tracking.component';

describe('SalesTrackingComponent', () => {
  let component: SalesTrackingComponent;
  let fixture: ComponentFixture<SalesTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
