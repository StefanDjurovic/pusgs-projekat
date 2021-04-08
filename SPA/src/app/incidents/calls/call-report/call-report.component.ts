import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.css']
})
export class CallReportComponent implements OnInit {
  anonymousCheck = false;

  reasons = [
    'No Electricity',
    'There is a malfunction',
    'Lights flickering',
    'Power is back',
    'Partial current',
    'Voltage problems'
  ];

  incidentForm: FormGroup = new FormGroup({
    reason: new FormControl(''),
    comment: new FormControl(''),
    hazard: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  submitIncident() {
    if (this.incidentForm.valid) {
      console.log(this.incidentForm.value);
    }
  }
}


