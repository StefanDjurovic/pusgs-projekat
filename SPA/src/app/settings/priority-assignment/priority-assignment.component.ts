import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  priority: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', priority: 1 },
  { position: 2, name: 'Helium', priority: 4 },
  { position: 3, name: 'Lithium', priority: 5 },
  { position: 4, name: 'Beryllium', priority: 2 },
  { position: 5, name: 'Boron', priority: 3 },
  { position: 6, name: 'Carbon', priority: 1 },
  { position: 7, name: 'Nitrogen', priority: 4 },
  { position: 8, name: 'Oxygen', priority: 5 },
  { position: 9, name: 'Fluorine', priority: 1 },
  { position: 10, name: 'Neon', priority: 2 },
];

@Component({
  selector: 'app-priority-assignment',
  templateUrl: './priority-assignment.component.html',
  styleUrls: ['./priority-assignment.component.css']
})
export class PriorityAssignmentComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'priority', 'update'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

  updateStreetPriority() {
    console.log('Update Priorities')
  }

}
