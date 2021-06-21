import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-call-report',
  templateUrl: './call-report.component.html',
  styleUrls: ['./call-report.component.css']
})
export class CallReportComponent implements OnInit {
  @Output() returnToCalls: EventEmitter<any> = new EventEmitter();

  anonymousCheck = false;
  streetValues = [];

  reasons = [
    { name: 'No Electricity', value: 0 },
    { name: 'There is a malfunction', value: 1 },
    { name: 'Lights flickering', value: 2 },
    { name: 'Power is back', value: 3 },
    { name: 'Partial current', value: 4 },
    { name: 'Voltage problems', value: 5 },
  ];

  incidentForm: FormGroup = new FormGroup({
    reason: new FormControl(''),
    comment: new FormControl(''),
    hazard: new FormControl(''),
    reporter: new FormControl({ value: "", disabled: true }),
    streetName: new FormControl(''),
    streetNumber: new FormControl(''),
  });

  constructor(private http: HttpClient, private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPriorities();
  }

  submitIncident() {
    var id = this.authService.decodedToken.nameid;
    if (this.incidentForm.valid) {
      if (this.anonymousCheck === true || id === null) {
        this.incidentForm.value["reporter"] = "Anonymous Reporter";
      } else {
        this.incidentForm.value["reporter"] = id;
      }

      this.incidentForm.value["reason"] = this.incidentForm.value["reason"].value;
      var url = 'http://localhost:5000/api/call/new/';
      this.http.post(url, this.incidentForm.value).subscribe(response => {
        console.log(response);
        this.alertify.success('Successfully Submited a Call!');
        this.router.navigate(['/home']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  returnToCallsTable() {
    console.log('show map');
  }

  fetchPriorities() {
    var url = 'http://localhost:5000/api/AddressPriority/';
    this.http.get(url).subscribe(res => {
      this.streetValues = JSON.parse(JSON.stringify(res));
      console.log(this.streetValues);
    });
  }
}


