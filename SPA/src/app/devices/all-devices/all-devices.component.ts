import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

export interface DeviceElement {
  id: number;
  userId: number;
  name: string;
  surname: string;
  streetName: string;
  streetNumber: number;
  city: string;
  telephone: string;
  priority: number;
  accountType: string;
}

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})
export class AllDevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'telephone', 'street_name', 'street_number', 'city', 'priority', 'icons'];
  dataSource = null;
  data = [];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  rawStreetValues = null;
  accountTypeFilterValues = [];
  streetNameFilterValues = []

  show: boolean = true;

  filterForm: FormGroup = new FormGroup({
    accountType: new FormControl({ value: 'undefined', disabled: false }),
    streetName: new FormControl({ value: 'undefined', disabled: false }),
  });

  ngAfterViewInit() {

  }

  constructor(private router: Router, private http: HttpClient, private alertify: AlertifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchDevicePage();
    this.fetchDeviceCount();

    this.accountTypeFilterValues = ['Residential', 'Commercial']
    this.fetchStreetNames();
  }

  toggle() {
    this.show = !this.show;
  }

  redirectToAddDevicePage() {
    this.router.navigate(['add-device']);
  }


  reloadTable(n) {
    this.limit = n;
    this.fetchDevicePage();
  }

  fetchAllDevices() {
    var url = 'http://localhost:5000/api/device/all-devices';
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.dataSource = new MatTableDataSource<DeviceElement>(responseJSON);
    });
  }


  fetchDevicePage() {
    //this.filterForm.value['AccountType'] = "Commercial";
    //this.filterForm.value['StreetName'] = "Bulevar oslobođenja";
    var id = this.authService.decodedToken.nameid;
    console.log(this.filterForm.value);
    // + '&streetName=' + this.filterForm.value['AccountType'] + '&accountType=' + this.filterForm.value['StreetName']
    var url = 'http://localhost:5000/api/device/devices/' + id + '/' + this.filterForm.value['accountType'] + '/' + this.filterForm.value['streetName'] + '/?pageNumber=' + this.page + '&pageSize=' + this.limit;
    this.http.get<DeviceElement>(url).subscribe(response => {
      this.dataSource = response;

      for (var i = 0; i < this.dataSource.length; i++) {
        if (response[i].accountType === 0) {
          response[i].accountType = 'Residential';
        } else {
          response[i].accountType = 'Commercial';
        }
      }

      this.loading = false;
      console.log(this.dataSource);
    });
  }

  fetchDeviceCount() {
    var id = this.authService.decodedToken.nameid;
    var url = 'http://localhost:5000/api/device/total-pages/' + id + '/' + this.filterForm.value['accountType'] + '/' + this.filterForm.value['streetName'];
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      this.total = JSON.parse(response);
    });
  }


  removeDevice(id) {
    var url = 'http://localhost:5000/api/device/remove/' + id;
    this.http.get(url).subscribe(response => {
      this.alertify.success('Device Removed!');
      this.fetchAllDevices();
    }, error => {
      console.log('Failed to Remove Device!');
      this.alertify.error(error);
    });
  }

  updateDevice(id) {
    console.log(id);
  }

  goToPrevious() {
    console.log('Previous Button Clicked!');
    this.page--;
    this.fetchDevicePage();
  }

  goToNext() {
    console.log('Next Button Clicked!');
    this.page++;
    this.fetchDevicePage();
  }

  goToPage(n: number) {
    console.log('Going to Specific Page!');
    this.page = n;
    this.fetchDevicePage();
  }

  clearFilter() {
    this.filterForm = new FormGroup({
      accountType: new FormControl({ value: 'undefined', disabled: false }),
      streetName: new FormControl({ value: 'undefined', disabled: false }),
    });

    this.fetchDevicePage();
    this.fetchDeviceCount();
  }

  applyFilter() {
    console.log(this.filterForm.value);
    this.dataSource = [];
    this.fetchDevicePage();
    this.fetchDeviceCount();
  }

  fetchStreetNames() {
    var url = 'http://localhost:5000/api/AddressPriority/';
    this.http.get(url).subscribe(res => {
      this.rawStreetValues = JSON.parse(JSON.stringify(res));
      for (var i = 0; i < this.rawStreetValues.length; i++) {
        this.streetNameFilterValues.push(this.rawStreetValues[i].street);
      }
    });
  }

  onAccountTypeChange(event) {
    this.filterForm.value['accountType'] = event.value;
  }

  onStreetNameChange(event) {
    this.filterForm.value['streetName'] = event.value;
  }
}
