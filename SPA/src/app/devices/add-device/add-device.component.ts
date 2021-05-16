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

  userService = null;
  authService = null;

  deviceForm: FormGroup = new FormGroup({
    Name: new FormControl(''),
    Surname: new FormControl(''),
    Location: new FormControl(''),
    Telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    AccountType: new FormControl(''),
  });

  constructor(private http: HttpClient, userService: UserService, authService: AuthService, private alertify: AlertifyService, private router: Router) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getCurrentUserProfle();
  }

  submitNewDevice() {
    var baseURL = 'http://localhost:5000/api/device/add';

    if (this.deviceForm.valid) {
      this.deviceForm.value['Priority'] = 0;
      this.deviceForm.value['Id'] = 0;
      this.deviceForm.value['AccountType'] = Number(this.deviceForm.value['AccountType']);

      console.log(this.deviceForm.value);

      this.http.post(baseURL, this.deviceForm.value).subscribe(response => {
        this.alertify.success('New Device Added!');
        this.router.navigate(['all-devices'])
      }, error => {
        console.log('Failed to add new Device!');
        this.alertify.error(error);
      });
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
}
