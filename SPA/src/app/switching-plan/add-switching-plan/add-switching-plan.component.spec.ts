import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSwitchingPlanComponent } from './add-switching-plan.component';

describe('AddSwitchingPlanComponent', () => {
  let component: AddSwitchingPlanComponent;
  let fixture: ComponentFixture<AddSwitchingPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSwitchingPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSwitchingPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
