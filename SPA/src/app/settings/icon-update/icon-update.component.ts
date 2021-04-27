import { Component, OnInit } from '@angular/core';


export interface PeriodicElement {
  position: number;
  used_for: string;
  current: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, used_for: 'incident', current: 'receipt' },
  { position: 2, used_for: 'crew', current: 'people' },
  { position: 3, used_for: 'call', current: 'call' },
];

@Component({
  selector: 'app-icon-update',
  templateUrl: './icon-update.component.html',
  styleUrls: ['./icon-update.component.css']
})
export class IconUpdateComponent implements OnInit {
  displayedColumns: string[] = ['position', 'used_for', 'current', 'select_new'];

  available_icons = [
    'receipt',
    'people',
    'call',
    'build',
    'book',
    'assignment_late',
    'assessment',
  ]

  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

  updateIcons() {

  }



}
