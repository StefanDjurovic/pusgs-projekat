import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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


  deviceForm: FormGroup = new FormGroup({
    UserId: new FormControl(''),
    Name: new FormControl(''),
    Surname: new FormControl(''),
    StreetName: new FormControl(''),
    StreetNumber: new FormControl('', [Validators.required, Validators.pattern("[1-9]{1}[0-9]{0,1}[0-9]{0,1}")]),
    City: new FormControl({ value: 'Novi Sad', disabled: true }),
    Telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    AccountType: new FormControl(''),
  });

  constructor(private http: HttpClient, userService: UserService, authService: AuthService, private alertify: AlertifyService, private router: Router) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getCurrentUserProfle();
    this.fetchPriorities();
  }

  submitNewDevice() {
    var baseURL = 'http://localhost:5000/api/device/add';

    if (this.deviceForm.valid) {
      this.deviceForm.value['UserId'] = this.authService.decodedToken.nameid;
      this.deviceForm.value['AccountType'] = Number(this.deviceForm.value['AccountType']);

      var streetObject = this.deviceForm.value['StreetName'];
      this.deviceForm.value['StreetName'] = streetObject.street;
      this.deviceForm.value['Priority'] = streetObject.priority;
      this.deviceForm.value['City'] = streetObject.city;


      console.log(this.deviceForm.value);
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
    this.selectedStreet = e.value.priority;
  }
}
