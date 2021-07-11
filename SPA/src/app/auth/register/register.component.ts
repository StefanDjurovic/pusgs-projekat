import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Unit } from 'src/app/_models/Unit';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { imageService } from 'src/app/_services/image.service';
import { UnitService } from 'src/app/_services/unit.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    birthday: new FormControl(''),
    address: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl(''),
    unit: new FormControl(''),
    // image: new FormControl(''),
  });

  
  @Output() cancelRegister = new EventEmitter();

  uploadProgress = 0;
  isUploading = false;
  units: Unit[];
  profileImage: File = null;

  constructor(private authService: AuthService, private imageService: imageService, private unitService: UnitService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.unitService.getUnits().subscribe(units => {
      this.units = units;
      console.log(this.units);
    }, error => {
      console.log(error);
    })
  }

  register() {
    console.log('attempting to register');
    if (this.form.valid) {
        this.authService.register(this.form.value).subscribe((userId) => {
        this.alertify.success('registration successful');
        this.router.navigate(['/login']);
        
        // log id?
        console.log(userId);
        
        // add profile image
        if (this.profileImage != null) {
          this.onImageUpload(this.profileImage, userId)
        }

        // add to unit
        if (this.form.get('role').value == 'teamMember') {
          console.log(this.form.get('unit').value);
          this.unitService.addUnitMember(this.form.get('unit').value, userId).subscribe(() => {}, error => {
            console.log(error);
          })
        }
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

  async onImageSelection(event) {
    this.profileImage = event.target.files[0];
  }

  async onImageUpload(file, id) {
    if (file === null)
    return;

    this.uploadProgress = 0;
    this.isUploading = true;
    
    // to test progress bar
    // await new Promise(f => setTimeout(f, 1000));

    this.imageService.uploadImage(id, file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
        
      }
      else if (event.type === HttpEventType.Response) {
        // this.loadImage();
        this.uploadProgress = 100;
      }
    });

    this.isUploading = false;
  }

}
