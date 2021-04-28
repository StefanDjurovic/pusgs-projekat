import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    name: new FormControl(''),
    surname: new FormControl(''),
    location: new FormControl(''),
    telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
    account_type: new FormControl(''),
  });

  constructor(private http: HttpClient, userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getCurrentUserProfle();
  }

  submitNewDevice() {
    if (this.deviceForm.valid) {
      console.log('sending a new device to server...');
      console.log(this.deviceForm.value);
    }
  }

  getCurrentUserProfle() {
    var id = this.authService.decodedToken.nameid;
    this.userService.getUser(id).subscribe(res => {
      this.name = res.name;
      this.surname = res.surname;

      this.deviceForm.controls['name'].setValue(res.name);
      this.deviceForm.controls['surname'].setValue(res.surname);
    });
  }
}
