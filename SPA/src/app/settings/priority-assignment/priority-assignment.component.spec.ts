import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityAssignmentComponent } from './priority-assignment.component';

describe('PriorityAssignmentComponent', () => {
  let component: PriorityAssignmentComponent;
  let fixture: ComponentFixture<PriorityAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriorityAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
