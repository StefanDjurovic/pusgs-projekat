import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkRequest } from 'src/app/_models/WorkRequest';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { WorkRequestService } from 'src/app/_services/workRequest.service';

@Component({
  selector: 'app-work-request-form',
  templateUrl: './work-request-form.component.html',
  styleUrls: ['./work-request-form.component.css']
})
export class WorkRequestFormComponent implements OnInit {
  types = [
    { value: 'planned', viewValue: 'Planned Work' },
    { value: 'notplanned', viewValue: 'Unplanned Work' },
  ];

  workRequest: WorkRequest;
  equipments = [];
  history = [];
  emergencyWorkToggle = false;
  currentlyShow = 'basicInformation';
  file: File = null;
  
  

  


  workRequestForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    workType: new FormControl(''),
    incident: new FormControl({ value: '', disabled: true }),
    equipment: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    // createdBy: new FormControl({ value: '', disabled: true }),
    purpose: new FormControl(''),
    additionalNotes: new FormControl(''),
    isEmergency: new FormControl(false),
    company: new FormControl(''),
    phoneNumber: new FormControl(''),
    createdAt: new FormControl({ value: '', disabled: true }),
    userId: new FormControl({ value: '', disabled: true}),
    documentType: new FormControl({ value: 'draft', disabled: true })
    // emergencyWork: new FormControl(false),
  });

  constructor(private workRequestService: WorkRequestService, private router: Router, private alertify: AlertifyService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.workRequest = data['workRequest']
      this.workRequestForm.patchValue(this.workRequest);
      console.log(this.workRequest);
      this.emergencyWorkToggle = this.workRequest?.isEmergency;
      // this.workRequestForm.controls.createdBy.setValue(this.auth)
    }, error => {
      this.alertify.error(error);
    })
  }

  submitWorkRequest() {
    // console.log(this.workRequestForm.value);
    
    this.checkEmergencyToggle();
    if (this.workRequestForm.valid) {
      // console.log(this.workRequestForm.value);
      this.workRequestForm.controls.userId.setValue(this.authService.getId());
      
      
      // this.workRequestService.createWorkRequest(this.workRequestForm.value).subscribe(next => {
        //   this.alertify.success('work request created');
        //   this.router.navigate(['/work-requests']);
        // }, error => {
          //   this.alertify.error(error);        
          // })
          
      if (this.workRequest) {

        this.workRequestService.updateWorkRequest(this.workRequestForm.value).subscribe(next => {
          this.alertify.success('changes saved');
        }, error => {
          this.alertify.error('could not save changes');
          console.log(error);
          
        })
      } else {
        this.workRequestForm.controls.createdAt.setValue(Date.now());
        this.workRequestForm.controls.id.setValue(-1);
        this.workRequestService.createWorkRequest(this.workRequestForm.value).subscribe(next => {
          this.alertify.success('work request created');
          this.router.navigate(['/edit-work-request/' + next]);
        }, error => {
          this.alertify.error('could not create work request');
          console.log(error);
        })
      }
        
    } else 
    {
      this.alertify.error('please fill in all the required fields');
    }
  }

  checkEmergencyToggle() {
    this.workRequestForm.controls['isEmergency'].setValue(this.emergencyWorkToggle);
  }

  changeCurrentlyShown(param) {
    console.log(param);
    
  }

  onDelete() {
    if (this.workRequest) {
      this.workRequestService.delete(this.workRequest.id).subscribe(next => {
        this.alertify.message('work request deleted');
        this.router.navigate(['/work-requests']);
      }, error => {
        this.alertify.error('could not delete');
        console.log(error);
        
      })
    }
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    // this.pictureForm.controls['picture'].setValue(this.file.name);
    if (this.file != null) {
      this.onAttachUpload();
    }
  }

  onDownload(attachId) {
    this.workRequestService.downloadAttachment(this.workRequest.id, attachId).subscribe(data => {
      // const blob = new Blob(data, { type: 'text/csv' });
      const url = window.URL.createObjectURL(data);
      window.open(url);
    }, error => {
      this.alertify.error(error);
    })
  }

  onDeleteAttach(attachId) {
    this.workRequestService.deleteAttachment(this.workRequest.id, attachId).subscribe(next => {
      this.alertify.message('attachment deleted');
    }, error => {
      this.alertify.error('could not delete attachment');
      console.log(error);
      
    })
  }

  onAttachUpload() {

    let progress = 0;
    let message = "";
    let fileToUpload = this.file;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    // var id = this.authService.decodedToken.nameid;
    // this.http.post('http://localhost:5000/api/upload/profile-image/' + id, formData, { reportProgress: true, observe: 'events' }).subscribe(event => {
    this.workRequestService.uploadAttachmnet(this.workRequest.id, formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        progress = Math.round(100 * event.loaded / event.total);
      }
      else if (event.type === HttpEventType.Response) {
        // this.message = 'Upload success.';
        this.alertify.success('Upload successful')
        // this.loadImage();
        // location.reload();
      }
    }, error => {
      this.alertify.error(error);
    });
  }
}