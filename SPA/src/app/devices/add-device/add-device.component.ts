import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  name = '';
  surname = '';
  streetsPriorities = [];
  selectedStreet = 'First Select a Street!';
  userService = null;
  authService = null;
  consumer_id = null;

  deviceForm: FormGroup = new FormGroup({
    UserId: new FormControl(''),
    Name: new FormControl({ disabled: true }),
    Surname: new FormControl({ disabled: true }),
    StreetName: new FormControl(''),
    StreetNumber: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{0,1}[0-9]{0,1}")]),
    City: new FormControl({ disabled: true }),
    Telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    AccountType: new FormControl(''),
    Priority: new FormControl(''),
  });

  constructor(private http: HttpClient, userService: UserService, authService: AuthService, private alertify: AlertifyService, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.fetchPriorities();
    this.consumer_id = this._Activatedroute.snapshot.paramMap.get("id");
    console.log(this.consumer_id);

    if (this.consumer_id != null) {
      this.fetchExistingConsumer(this.consumer_id);
    }
    else {
      this.getCurrentUserProfle();
    }
  }

  submitNewDevice() {
    var baseURL = 'http://localhost:5000/api/device/add';

    if (this.deviceForm.valid) {
      console.log(this.deviceForm.value);

      if (this.consumer_id === null) {
        var streetObject = this.deviceForm.value['StreetName'];
        this.deviceForm.value['UserId'] = this.authService.decodedToken.nameid;
        this.deviceForm.value['AccountType'] = Number(this.deviceForm.value['AccountType']);
        this.deviceForm.value['StreetName'] = streetObject.street;
        this.deviceForm.value['Priority'] = streetObject.priority;
        this.deviceForm.value['City'] = streetObject.city;
        console.log(this.deviceForm.value);
      } else {
        this.deviceForm.addControl("Id", new FormControl(""));
        this.deviceForm.value['Id'] = this.consumer_id;
      }

      if (this.deviceForm.valid) {
        this.http.post(baseURL, this.deviceForm.value).subscribe(response => {
          this.alertify.success('New Device Added!');
          //this.router.navigate(['all-devices'])
        }, error => {
          console.log('Failed to add new Device!');
          this.alertify.error(error);
        });
      }
    }
  }

  fetchExistingConsumer(consumer_id) {
    this.http.get("http://localhost:5000/api/device/get/" + consumer_id, this.deviceForm.value).subscribe(response => {
      console.log(response);

      // this.deviceForm.value['UserId'] = response['userId'];
      // this.deviceForm.value['Name'] = response['name'];
      // this.deviceForm.value['Surname'] = response['surname'];
      // this.deviceForm.value['StreetName'] = response['streetName'];
      // this.deviceForm.value['StreetNumber'] = response['streetNumber'];
      // this.deviceForm.value['City'] = response['city'];
      // this.deviceForm.value['Telephone'] = response['telephone'];
      // this.deviceForm.value['AccountType'] = response['accountType'];

      this.deviceForm.controls['UserId'].setValue(response['userId']);
      this.deviceForm.controls['Name'].setValue(response['name']);
      this.deviceForm.controls['Surname'].setValue(response['surname']);
      this.deviceForm.controls['StreetName'].setValue(response['streetName']);
      this.deviceForm.controls['StreetNumber'].setValue(response['streetNumber']);
      this.deviceForm.controls['City'].setValue(response['city']);
      this.deviceForm.controls['Telephone'].setValue(response['telephone']);
      this.deviceForm.controls['AccountType'].setValue(response['accountType']);
      this.deviceForm.controls['Priority'].setValue(response['priority']);
    });
  }

  getCurrentUserProfle() {
    var id = this.authService.decodedToken.nameid;
    this.userService.getUser(id).subscribe(res => {
      this.name = res.name;
      this.surname = res.surname;

      this.deviceForm.controls['Name'].setValue(res.name);
      this.deviceForm.controls['Surname'].setValue(res.surname);
    });
  }

  fetchPriorities() {
    var url = 'http://localhost:5000/api/AddressPriority/';
    this.http.get(url).subscribe(res => {
      this.streetsPriorities = JSON.parse(JSON.stringify(res));
      console.log(this.streetsPriorities);
    });
  }

  onStreetChange(e) {
    console.log(e.value);
    this.selectedStreet = e.value;
  }
}
