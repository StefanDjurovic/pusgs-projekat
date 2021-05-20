import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { WorkRequestService } from 'src/app/_services/workRequest.service';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {
  types = [
    { value: 'planned', viewValue: 'Planned Work' },
    { value: 'notplanned', viewValue: 'Unplanned Work' },
  ];

  equipments = [];

  emergencyWorkToggle = false;

  workRequestForm: FormGroup = new FormGroup({
    workType: new FormControl(''),
    draft: new FormControl({ value: '', disabled: true }),
    incident: new FormControl({ value: '', disabled: true }),
    equipment: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    createdBy: new FormControl({ value: '', disabled: true }),
    purpose: new FormControl(''),
    details: new FormControl(''),
    notes: new FormControl(''),
    company: new FormControl(''),
    phoneNumber: new FormControl(''),
    createdAt: new FormControl(''),
    userId: new FormControl(''),
    emergencyWork: new FormControl(false),
  });

  constructor(private workRequestService: WorkRequestService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitWorkRequest() {
    this.checkEmergencyToggle();
    if (this.workRequestForm.valid) {
      console.log(this.workRequestForm.value);
      this.workRequestForm.controls.userId.setValue(this.authService.getId());
      this.workRequestService.createWorkRequest(this.workRequestForm.value).subscribe(next => {
        console.log(next);
        
      }, error => {
        console.log(error);
        
      })
    } else 
    {
      console.log('invalid work request!');
      
    }
  }

  checkEmergencyToggle() {
    this.workRequestForm.controls['emergencyWork'].setValue(this.emergencyWorkToggle);
  }
}