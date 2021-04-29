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

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, id: 2, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
//   { position: 1, id: 3, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 7, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
//   { position: 1, id: 9, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
//   { position: 1, id: 4, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 18, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 32, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 86, name: 'Name', surname: 'Surname', location: 'gdfg adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 12, name: 'Name', surname: 'Surname', location: 'gdfg adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 98, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 47, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
//   { position: 1, id: 65, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 45, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
//   { position: 1, id: 53, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
//   { position: 1, id: 65, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
//   { position: 1, id: 51, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
//   { position: 1, id: 99, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 32, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
//   { position: 1, id: 41, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
// ];


@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})
export class AllDevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'surname', 'location', 'telephone', 'priority', 'icons'];
  dataSource = null;
  data = [];

  ngAfterViewInit() {

  }

  constructor(private router: Router, private http: HttpClient, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.fetchDevices();
  }

  redirectToAddDevicePage() {
    this.router.navigate(['add-device']);
  }

  fetchDevices() {
    var url = 'http://localhost:5000/api/device/devices';
    this.http.get(url, { responseType: 'text' }).subscribe(response => {
      var responseJSON = JSON.parse(response);
      this.dataSource = new MatTableDataSource<DeviceElement>(responseJSON);
    });
  }


  removeDevice(id) {
    var url = 'http://localhost:5000/api/device/remove/' + id;
    this.http.get(url).subscribe(response => {
      this.alertify.success('Device Removed!');
      this.fetchDevices();
    }, error => {
      console.log('Failed to Remove Device!');
      this.alertify.error(error);
    });
  }

  updateDevice(id) {
    console.log(id);
  }

}
