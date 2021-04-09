import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  authService = null;

  passwordForm: FormGroup = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  }, { validators: this.checkPasswords });


  constructor(private http: HttpClient, authService: AuthService, private alertify: AlertifyService) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('new_password').value;
    const confirmPassword = group.get('confirm_password').value;

    return password === confirmPassword ? null : { notSame: true }
  }

  updatePassword() {
    var id = this.authService.decodedToken.nameid;
    var baseURL = 'http://localhost:5000/api/user/' + id + '/update-password';
    if (this.passwordForm.valid) {

      var data = { 'currentPassword': this.passwordForm.value.current_password, 'newPassword': this.passwordForm.value.new_password };
      console.log(data);
      this.http.post(baseURL, data).subscribe(() => {
        this.alertify.success('successfully updated password');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
}
