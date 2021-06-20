import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-switching-plan',
  templateUrl: './switching-plan.component.html',
  styleUrls: ['./switching-plan.component.css']
})
export class SwitchingPlanComponent implements OnInit {
  dataSource = null;
  data = [];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  show = true;

  sortBy = "Id";
  sortDirection = "ascending";

  typeFilterValues = ['Planned', 'NotPlanned'];
  statusFilterValues = ['Draft', 'Submited']

  filterForm: FormGroup = new FormGroup({
    type: new FormControl({ value: 'undefined', disabled: false }),
    status: new FormControl({ value: 'undefined', disabled: false }),
  });

  constructor(private router: Router, private http: HttpClient, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  redirectToAddSwitchPlanPage() {
    this.router.navigate(['new-safety-document']);
  }


  reloadTable(n) {
    this.limit = n;
    this.fetchAllDocuments();
    console.log(this.total);
  }

  fetchAllDocuments() {
    var sortingParams = { 'SortBy': this.sortBy, 'SortDirection': this.sortDirection };
    console.log(sortingParams);
    var url = 'http://localhost:5000/api/safetydocuments/get-plans/' + this.filterForm.value['type'] + '/' + this.filterForm.value['status'] + '/?pageNumber=' + this.page + '&pageSize=' + this.limit;
    this.http.post(url, sortingParams).subscribe(response => {
      this.dataSource = response;
      //console.log(this.dataSource);

      for (var i = 0; i < this.dataSource.length; i++) {
        if (response[i].status === 0) {
          response[i].status = 'Draft';
        } else {
          response[i].status = 'Submited';
        }
      }

      for (var i = 0; i < this.dataSource.length; i++) {
        if (response[i].type === 0) {
          response[i].type = 'Planned';
        } else {
          response[i].type = 'Not Planned';
        }
      }
    });
  }

  fetchDocumentsCount() {
    var sortingParams = { 'SortBy': this.sortBy, 'SortDirection': this.sortDirection };

    var url = 'http://localhost:5000/api/safetydocuments/document-count/' + this.filterForm.value['type'] + '/' + this.filterForm.value['status'] + '/?pageNumber=' + this.page + '&pageSize=' + this.limit;
    this.http.post(url, sortingParams, { responseType: 'text' }).subscribe(response => {
      this.total = JSON.parse(response);
      //this.total = this.dataSource.length;
    });
  }

  removeDocument(id) {
    var url = 'http://localhost:5000/api/safetydocuments/delete/' + id;
    this.http.post(url, { responseType: 'text' }).subscribe(response => {
      console.log(response);

      this.alertify.success('Safety Document was Removed!');

      this.fetchAllDocuments();
      this.fetchDocumentsCount();
    });
  }

  updateDocument(id) {
    console.log(id);
  }

  goToPrevious() {
    console.log('Previous Button Clicked!');
    this.page--;
    this.fetchAllDocuments();
  }

  goToNext() {
    console.log('Next Button Clicked!');
    this.page++;
    this.fetchAllDocuments();
  }

  goToPage(n: number) {
    console.log('Going to Specific Page!');
    this.page = n;
    this.fetchAllDocuments();
  }

  clearFilter() {
    this.filterForm = new FormGroup({
      type: new FormControl({ value: 'undefined', disabled: false }),
      status: new FormControl({ value: 'undefined', disabled: false }),
    });

    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  applyFilter() {
    console.log(this.filterForm.value);
    this.dataSource = [];
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  onTypeChange(event) {
    this.filterForm.value['type'] = event.value;
  }

  onStatusChange(event) {
    this.filterForm.value['status'] = event.value;
  }

  // SORTING FUNCTIONS
  onIdClick() {
    this.sortBy = "Id";
    this.changeDirection();
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  onFieldCrewClick() {
    this.sortBy = "FieldCrew";
    this.changeDirection();
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  onSwitchingPlanClick() {
    this.sortBy = "SwitchingPlan";
    this.changeDirection();
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  onCreatedDateTimeClick() {
    this.sortBy = "CreatedDateTime";
    this.changeDirection();
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  onTelephoneNumberClick() {
    this.sortBy = "Telephone";
    this.changeDirection();
    this.fetchAllDocuments();
    this.fetchDocumentsCount();
  }

  changeDirection() {
    if (this.sortDirection === 'ascending')
      this.sortDirection = 'descending';
    else
      this.sortDirection = 'ascending';
  }

}
