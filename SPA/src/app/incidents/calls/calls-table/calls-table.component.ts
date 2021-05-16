import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-calls-table',
  templateUrl: './calls-table.component.html',
  styleUrls: ['./calls-table.component.css']
})
export class CallsTableComponent {
  @Output() callFormShowEvent: EventEmitter<any> = new EventEmitter();

  displayedColumns: string[] = ['callId', 'reason', 'hazard', 'comment', 'marker'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  showCallForm() {
    this.callFormShowEvent.emit();
  }
}

export interface PeriodicElement {
  callId: number;
  reason: string;
  hazard: string;
  comment: string;
  marker: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { callId: 1, reason: 'Strong wind!', hazard: 'No Electricity', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 2, reason: 'Strong wind!', hazard: 'Lights flickering', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 3, reason: 'Strong wind!', hazard: 'Lights flickering', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 4, reason: 'Strong wind!', hazard: 'Lights flickering', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 5, reason: 'Strong wind!', hazard: 'Lights flickering', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 6, reason: 'Strong wind!', hazard: 'No Electricity', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 7, reason: 'Strong wind!', hazard: 'There is a malfunction', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 8, reason: 'Strong wind!', hazard: 'No Electricity', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 9, reason: 'Strong wind!', hazard: 'Lights flickering', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 10, reason: 'Strong wind!', hazard: 'Partial current', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 11, reason: 'Strong wind!', hazard: 'Partial current', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 12, reason: 'Strong wind!', hazard: 'No Electricity', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 13, reason: 'Strong wind!', hazard: 'Partial current', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 14, reason: 'Strong wind!', hazard: 'Partial current', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 15, reason: 'Strong wind!', hazard: 'Power is back', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 16, reason: 'Strong wind!', hazard: 'Power is back', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 17, reason: 'Strong wind!', hazard: 'There is a malfunction', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 18, reason: 'Strong wind!', hazard: 'There is a malfunction', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 19, reason: 'Strong wind!', hazard: 'No Electricity', comment: 'Lorem Ipsum', marker: 'location_on' },
  { callId: 20, reason: 'Strong wind!', hazard: 'Partial current', comment: 'Lorem Ipsum', marker: 'location_on' },
];

