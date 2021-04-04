import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    surname: new FormControl(''),
    birthday: new FormControl(''),
    address: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });


  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    console.log('attempting to register');
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe(() => {
        this.alertify.success('registration successful');
        this.router.navigate(['/login']);
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
