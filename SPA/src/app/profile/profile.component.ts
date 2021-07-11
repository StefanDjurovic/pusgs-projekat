import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Output, EventEmitter, NgModuleFactoryLoader } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { imageService } from '../_services/image.service';
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
    current_password: new FormControl(''),
    new_password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
  }, { validators: this.checkPasswords });

  // ? 
  pictureForm: FormGroup = new FormGroup({
    picture: new FormControl(''),
  });

  public file: File = null;
  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();

  userService = null;
  authService = null;
  currentUser = null;
  initialValue = null;
  hasChanged = false;

  uploadProgress = 0;
  isUploading = false;

  profileImageToShow: any;
  noUserProfileImage = true;

  constructor(private http: HttpClient, private imageService: imageService, userService: UserService, authService: AuthService, private alertify: AlertifyService, private changeDetector: ChangeDetectorRef) {
    this.userService = userService;
    this.authService = authService;
  }

  ngOnInit(): void {
    this.getCurrentUserProfle();

    // localStorage.setItem('notificationCount', '5');
    // console.log(localStorage.notificationCount);
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
        this.getCurrentUserProfle();
        this.initialValue = this.profileForm.value;
        this.alertify.success('successfully updated profile');
      }, error => {
        this.alertify.error(error);
      });
    }
    else { console.log('nothing changed') }
  }

  getCurrentUserProfle() {
    var id = this.authService.decodedToken.nameid;
    this.currentUser = this.userService.getUser(id).subscribe(res => {
      this.currentUser = res;
      if (this.currentUser.profileImage) {
        this.noUserProfileImage = false;
        this.loadImage();
      }
      this.fillForm();
    });
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

  updateProfilePicture() {
    if (this.pictureForm.valid) {
      console.log(this.pictureForm.value);
    }
  }

  async onImageUpload(event) {
    this.file = event.target.files[0];
    if (this.file === null)
    return;

    this.uploadProgress = 0;
    this.isUploading = true;
    
    // to test progress bar
    // await new Promise(f => setTimeout(f, 1000));

    var id = this.authService.decodedToken.nameid;
    this.imageService.uploadImage(id, this.file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round(100 * event.loaded / event.total);
        
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.loadImage();
        this.uploadProgress = 100;
        // location.reload();
      }
    });

    this.isUploading = false;
  }


  onUpload() {

    if (this.file === null)
      return;

    this.progress = 0;
    this.message = "";

    var id = this.authService.decodedToken.nameid;
    this.imageService.uploadImage(id, this.file).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.loadImage();
        location.reload();
      }
    });
  }

  loadImage() {
    var id = this.authService.decodedToken.nameid;
    var imageUrl = 'http://localhost:5000/api/upload/retrieve-profile-image/' + id;
    this.http.get(imageUrl, { responseType: 'blob' }).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profileImageToShow = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
