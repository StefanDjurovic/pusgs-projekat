import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchingPlanComponent } from './switching-plan.component';

describe('SwitchingPlanComponent', () => {
  let component: SwitchingPlanComponent;
  let fixture: ComponentFixture<SwitchingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
