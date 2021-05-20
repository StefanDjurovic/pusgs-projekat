import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { WorkRequest } from 'src/app/_models/WorkRequest';

@Component({
  selector: 'app-work-requests',
  templateUrl: './work-requests.component.html',
  styleUrls: ['./work-requests.component.css']
})
export class WorkRequestsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  workRequests: WorkRequest[]

  displayedColumns: string[] = ['id', 'start_date', 'phone_num', 'status', 'address'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.workRequests = data['workRequests'];
    });

    console.log(this.workRequests);
    
  }

  showWorkRequestForm() {

  }

}

export interface PeriodicElement {
  id: string;
  start_date: string;
  phone_num: string;
  status: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 'WR1', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Mileve Marica 14' },
  { id: 'WR2', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Suboticka 10' },
  { id: 'WR3', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR4', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Mileve Marica 14' },
  { id: 'WR5', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR6', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Suboticka 10' },
  { id: 'WR7', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR8', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Mileve Marica 14' },
  { id: 'WR9', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Masarikova 2' },
  { id: 'WR10', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR11', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Suboticka 10' },
  { id: 'WR12', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Suboticka 10' },
  { id: 'WR13', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR14', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Masarikova 2' },
  { id: 'WR15', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR16', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Suboticka 10' },
  { id: 'WR17', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Mileve Marica 14' },
  { id: 'WR18', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Masarikova 2' },
  { id: 'WR19', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Vladike Cirica 10' },
  { id: 'WR20', start_date: formatDate(new Date(), 'yyyy/MM/dd', 'en'), phone_num: '845-412-231', status: 'Draft', address: 'Mileve Marica 14' },
];

