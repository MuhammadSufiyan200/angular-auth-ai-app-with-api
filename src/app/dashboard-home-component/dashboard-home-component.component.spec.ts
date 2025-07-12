import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHomeComponentComponent } from './dashboard-home-component.component';

describe('DashboardHomeComponentComponent', () => {
  let component: DashboardHomeComponentComponent;
  let fixture: ComponentFixture<DashboardHomeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHomeComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHomeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
