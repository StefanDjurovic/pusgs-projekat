import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  position: number;
  id: number;
  name: string;
  surname: string;
  location: string;
  telephone: number;
  priority: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, id: 2, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
  { position: 1, id: 3, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 7, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
  { position: 1, id: 9, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
  { position: 1, id: 4, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 18, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 32, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 86, name: 'Name', surname: 'Surname', location: 'gdfg adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 12, name: 'Name', surname: 'Surname', location: 'gdfg adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 98, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 47, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
  { position: 1, id: 65, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 45, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
  { position: 1, id: 53, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
  { position: 1, id: 65, name: 'Name', surname: 'Surname', location: 'asd gdfg', telephone: 123, priority: 1 },
  { position: 1, id: 51, name: 'Name', surname: 'Surname', location: 'asd', telephone: 123, priority: 1 },
  { position: 1, id: 99, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 32, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
  { position: 1, id: 41, name: 'Name', surname: 'Surname', location: 'asd adasdas', telephone: 123, priority: 1 },
];


@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.css']
})
export class AllDevicesComponent implements OnInit {
  displayedColumns: string[] = ['position', 'id', 'name', 'surname', 'location', 'telephone', 'priority', 'icons'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirectToAddDevicePage() {
    this.router.navigate(['add-device']);
  }

  removeDevice(id) {
    console.log(id);
  }

  updateDevice(id) {
    console.log(id);
  }

}
