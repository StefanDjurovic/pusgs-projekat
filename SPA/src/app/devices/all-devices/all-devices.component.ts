import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListSubheaderCssMatStyler } from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

export interface DeviceElement {
  id: number;
  name: string;
  surname: string;
  location: string;
  telephone: number;
  priority: number;
  account_type: number;
}

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})
export class AllDevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'location', 'telephone', 'priority', 'icons'];
  dataSource = null;
  data = [];

  total = 0;
  page = 1;
  limit = 10;
  loading = false;

  ngAfterViewInit() {

  }

  constructor(private router: Router, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.fetchDevicePage();
    this.fetchDeviceCount();
  }

  redirectToAddDevicePage() {
    this.router.navigate(['add-device']);
  }

  fetchAllDevices() {
    var url = 'http://localhost:5000/api/device/all-devices';
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.dataSource = new MatTableDataSource<DeviceElement>(responseJSON);
    });
  }


  fetchDevicePage() {
    var url = 'http://localhost:5000/api/device/devices?pageNumber=' + this.page + '&pageSize=' + this.limit;
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.dataSource = responseJSON;
      this.loading = false;
    });
  }

  fetchDeviceCount() {
    var url = 'http://localhost:5000/api/device/total-pages';
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

}
