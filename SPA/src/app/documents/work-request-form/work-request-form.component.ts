import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {
  types = [
    { value: 'planned', viewValue: 'Planned Work' },
    { value: 'unplanned', viewValue: 'Unplanned Work' },
  ];

  equipments = [];

  emergencyWorkToggle = false;

  workRequestForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    draft: new FormControl({ value: '', disabled: true }),
    incident: new FormControl({ value: '', disabled: true }),
    equipment: new FormControl(''),
    start_dt: new FormControl(''),
    end_dt: new FormControl(''),
    created_by: new FormControl({ value: '', disabled: true }),
    purpose: new FormControl(''),
    details: new FormControl(''),
    notes: new FormControl(''),
    company: new FormControl(''),
    phone_num: new FormControl(''),
    dt_created: new FormControl(''),
    emergencyWork: new FormControl(false),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submitWorkRequest() {
    this.checkEmergencyToggle();
    if (this.workRequestForm.valid) {
      console.log(this.workRequestForm.value);
    }
  }

  checkEmergencyToggle() {
    this.workRequestForm.controls['emergencyWork'].setValue(this.emergencyWorkToggle);
  }
}