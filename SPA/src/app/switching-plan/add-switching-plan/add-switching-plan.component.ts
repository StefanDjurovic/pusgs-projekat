import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

interface Instruction {
  message: string;
  isExecuted: boolean;
}

@Component({
  selector: 'app-add-switching-plan',
  templateUrl: './add-switching-plan.component.html',
  styleUrls: ['./add-switching-plan.component.css']
})
export class AddSwitchingPlanComponent implements OnInit {
  types = [
    { value: 'planned', viewValue: 'Planned Work' },
    { value: 'notplanned', viewValue: 'Unplanned Work' },
  ];

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;

  switchPlanId = null;

  streetsPriorities = [];

  switchingPlansValues = [];
  crewValues = [];

  basicInformationPage = true;
  historyPage = false;
  multimediaPage = false;
  equipmentPage = false;
  switchingPage = false;

  switchingPlanForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    status: new FormControl({ value: 'Draft', disabled: true }),

    switchingPlan: new FormControl(''),
    fieldCrew: new FormControl(''),

    createdBy: new FormControl({ value: '', disabled: true }),

    createdDateTime: new FormControl({ value: '', disabled: true }),

    details: new FormControl(''),
    notes: new FormControl(''),
    telephone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{9}")]),
  });


  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchSwitchingPlansValue();
    this.fetchCrewValues();
    this.fetchPriorities();
  }

  fetchPriorities() {
    var url = 'http://localhost:5000/api/AddressPriority/';
    this.http.get(url).subscribe(res => {
      this.streetsPriorities = JSON.parse(JSON.stringify(res));
      console.log(this.streetsPriorities);
    });
  }

  submitSwitchPlan() {
    if (this.switchingPlanForm.valid) {
      var id = this.authService.decodedToken.nameid;
      this.switchingPlanForm.value["createdById"] = id;

      if (this.switchingPlanForm.value["type"] === "planned") {
        this.switchingPlanForm.value["type"] = 0;
      }
      else {
        this.switchingPlanForm.value["type"] = 1;
      }

      this.switchingPlanForm.value["status"] = 0;
      this.switchingPlanForm.value["createdDateTime"] = new Date();

      console.log(this.switchingPlanForm.value);
      console.log(this.switchingInstructions);
      console.log(this.selectedFiles);

      // if (this.switchingPlanForm.value["type"] === "planned")
      //   this.switchingPlanForm.value["type"] = 0;
      // else {
      //   this.switchingPlanForm.value["type"] = 1;
      // }

      var url = 'http://localhost:5000/api/safetydocuments/create/';
      this.http.post(url, this.switchingPlanForm.value).subscribe(res => {
        this.switchPlanId = res;

        // upload multimedia attachments
        this.uploadFiles();
        this.uploadInstructions();

        this.router.navigate(["/safety-documents-all"]);
      });

    } else {
      console.log('invalid switching plan!');
    }
  }

  onSwitchingPlanChange(event) {

  }

  onWorkRequestChange(event) {

  }

  onTypeOfWorkRequestChange(event) {

  }

  resetViews() {
    this.basicInformationPage = false;
    this.historyPage = false;
    this.multimediaPage = false;
    this.equipmentPage = false;
    this.switchingPage = false;
  }


  basicInformationPageClick() {
    this.resetViews();
    this.basicInformationPage = true;
  }

  historyPageClick() {
    this.resetViews();
    this.historyPage = true;
  }

  multimediaPageClick() {
    this.resetViews();
    this.multimediaPage = true;
  }

  equipmentPageClick() {
    this.resetViews();
    this.equipmentPage = true;
  }

  switchingPageClick() {
    this.resetViews();
    this.switchingPage = true;
  }

  fetchSwitchingPlansValue() {
    this.switchingPlansValues = [1, 2, 3, 4, 5];
  }

  fetchCrewValues() {
    this.crewValues = [1, 2, 3, 4, 5];
  }

  selectFiles(event): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadFileFunction(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            //console.log(event);
            //this.fileInfos = this.uploadService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          //this.fileInfos = this.uploadService.getFiles();
        });
    }
  }

  uploadFileFunction(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file, file.name);

    var id = this.authService.decodedToken.nameid;
    var url = 'http://localhost:5000/api/upload/document/' + this.switchPlanId;

    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  /* switching plans part */
  switchingInstructions: Instruction[] = [];
  instructionInput: string = "";

  toggleDone(id: number) {
    this.switchingInstructions.map((v, i) => {
      if (i == id) v.isExecuted = !v.isExecuted;
      return v;
    })
  }

  deleteTodo(id: number) {
    this.switchingInstructions = this.switchingInstructions.filter((v, i) => i !== id);
  }

  addTodo() {
    if (this.instructionInput != "")
      this.switchingInstructions.push({
        message: this.instructionInput,
        isExecuted: false
      });

    this.instructionInput = "";
  }

  onWorkTypeChange(event) {
    this.switchingPlanForm.value["type"] = event.value();
  }

  uploadInstructions() {
    var url = 'http://localhost:5000/api/safetydocuments/instructions/' + this.switchPlanId;
    for (let i = 0; i < this.switchingInstructions.length; i++) {
      this.http.post(url, this.switchingInstructions[i]).subscribe(res => {
        console.log(res);
      });
    }
  }
}