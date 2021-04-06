import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    birthday: new FormControl(''),
    address: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  });

  pictureForm: FormGroup = new FormGroup({
    picture: new FormControl(''),
  });

  userService = null;
  authService = null;
  currentUser = null;
  initialValue = null;
  hasChanged = false;
  constructor(private http: HttpClient, userService: UserService, authService: AuthService, private alertify: AlertifyService, private changeDetector: ChangeDetectorRef) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    var id = this.authService.decodedToken.nameid;
    this.currentUser = this.userService.getUser(id).subscribe(res => {
      this.currentUser = res;
      this.fillForm();
    });
  }

  ngAfterViewChecked() {
    // implemented because of ExpressionChangedAfterItHasBeenCheckedError was triggered during page loading
    this.changeDetector.detectChanges();
  }

  fillForm() {
    var id = this.authService.decodedToken.nameid;
    this.profileForm.controls['id'].setValue(id);
    this.profileForm.controls['name'].setValue(this.currentUser.name);
    this.profileForm.controls['surname'].setValue(this.currentUser.surname);
    this.profileForm.controls['username'].setValue(this.currentUser.username);
    this.profileForm.controls['birthday'].setValue(this.currentUser.birthday);
    this.profileForm.controls['email'].setValue(this.currentUser.email);
    this.profileForm.controls['address'].setValue(this.currentUser.address);

    this.initialValue = this.profileForm.value;
  }

  onLoadGroupFormValueChange() {
    this.profileForm.valueChanges.subscribe(value => {
      this.hasChanged = Object.keys(this.initialValue).some(key => this.profileForm.value[key] !=
        this.initialValue[key]);
    });
  }

  updateProfile() {
    var baseURL = 'http://localhost:5000/api/user/update/';
    this.onLoadGroupFormValueChange();

    if (this.profileForm.valid && this.hasChanged) {
      console.log(this.profileForm.value);
      this.http.post(baseURL, this.profileForm.value).subscribe(() => {
        this.alertify.success('successfully updated profile');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  updatePassword() {
    console.log(this.currentUser);
    if (this.passwordForm.valid) {
      console.log(this.passwordForm.value);
    }
  }

  updateProfilePicture() {
    if (this.pictureForm.valid) {
      console.log(this.pictureForm.value);
    }
  }

}
